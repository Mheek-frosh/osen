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

async function uploadImage(imageClass) {
  const publicPath = imagePaths.get(imageClass)
  if (uploadedAssets.has(publicPath)) return uploadedAssets.get(publicPath)

  const filePath = resolve(projectRoot, 'public', publicPath.replace(/^\/assets\//, 'assets/'))
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  })
  uploadedAssets.set(publicPath, asset._id)
  return asset._id
}

console.log(`Importing ${products.length} products with the logged-in Sanity user…`)

for (const [index, product] of products.entries()) {
  const assetId = await uploadImage(product.image)
  await client.createOrReplace({
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
  })
  console.log(`[${index + 1}/${products.length}] ${product.name}`)
}

console.log('Catalog migration complete.')
