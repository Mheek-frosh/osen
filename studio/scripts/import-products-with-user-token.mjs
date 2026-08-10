import {createReadStream, readFileSync} from 'node:fs'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'
import {products} from '../../src/data/products.js'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, '..', '..')
const client = getCliClient({apiVersion: '2026-08-10'})

const css = readFileSync(resolve(projectRoot, 'src/styles.css'), 'utf8')
const imagePaths = new Map()
const imageRule = /\.sheet\.(image-[\w-]+)\s*\{[^}]*background-image:url\(['"]?(\/assets\/[^'")]+)['"]?\)/g

for (const match of css.matchAll(imageRule)) {
  imagePaths.set(match[1], match[2])
}

const missingImages = products.filter(product => !imagePaths.has(product.image))
if (missingImages.length) {
  throw new Error(`Missing image mappings for: ${missingImages.map(product => product.image).join(', ')}`)
}

const uploadedAssets = new Map()
const wait = milliseconds => new Promise(resolveWait => setTimeout(resolveWait, milliseconds))

async function withRetry(label, operation, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      const statusCode = error?.statusCode || error?.response?.statusCode
      const retryable = error?.code === 'ECONNRESET' || error?.code === 'ETIMEDOUT' || statusCode === 429 || statusCode >= 500
      if (!retryable || attempt === attempts) throw error
      const delay = 1000 * (2 ** (attempt - 1))
      console.warn(`${label} interrupted; retrying in ${delay / 1000}s (${attempt}/${attempts})…`)
      await wait(delay)
    }
  }
}

async function uploadImage(imageClass) {
  const publicPath = imagePaths.get(imageClass)
  if (uploadedAssets.has(publicPath)) return uploadedAssets.get(publicPath)

  const filePath = resolve(projectRoot, 'public', publicPath.replace(/^\/assets\//, 'assets/'))
  const asset = await withRetry(`Uploading ${basename(filePath)}`, () =>
    client.assets.upload('image', createReadStream(filePath), {filename: basename(filePath)}),
  )
  uploadedAssets.set(publicPath, asset._id)
  return asset._id
}

async function main() {
  const productIds = products.map(product => product.id)
  const existingIds = new Set(await withRetry('Checking existing products', () =>
    client.fetch('*[_type == "product" && _id in $ids]._id', {ids: productIds}),
  ))

  console.log(`Importing ${products.length} products with the logged-in Sanity user…`)
  console.log(`${existingIds.size} products already complete; resuming the remainder.`)

  for (const [index, product] of products.entries()) {
    if (existingIds.has(product.id)) {
      console.log(`[${index + 1}/${products.length}] Already imported: ${product.name}`)
      continue
    }

    const assetId = await uploadImage(product.image)
    await withRetry(`Saving ${product.name}`, () => client.createOrReplace({
      _id: product.id,
      _type: 'product',
      name: product.name,
      category: product.category,
      price: product.price,
      image: {_type: 'image', asset: {_type: 'reference', _ref: assetId}},
      material: product.material,
      description: product.description,
      badge: product.badge || undefined,
      soldOut: Boolean(product.soldOut),
      sortOrder: index,
    }))
    console.log(`[${index + 1}/${products.length}] ${product.name}`)
  }

  console.log('Catalog migration complete.')
}

main().catch(error => {
  const statusCode = error?.statusCode || error?.response?.statusCode || 'unknown'
  console.error(`Catalog migration stopped safely (status ${statusCode}): ${error?.message || 'Unknown error'}`)
  process.exitCode = 1
})
