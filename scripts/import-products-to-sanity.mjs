import {createReadStream, readFileSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {createClient} from '@sanity/client'
import {products} from '../src/data/products.js'

const css = readFileSync(resolve('src/styles.css'), 'utf8')
const imagePaths = new Map()
const imageRule = /\.sheet\.(image-[\w-]+)\s*\{[^}]*background-image:url\(['"]?(\/assets\/[^'")]+)['"]?\)/g

for (const match of css.matchAll(imageRule)) {
  imagePaths.set(match[1], match[2])
}

const missingImages = products.filter(product => !imagePaths.has(product.image))
if (missingImages.length) {
  throw new Error(`Missing image mappings for: ${missingImages.map(product => product.image).join(', ')}`)
}

if (process.argv.includes('--check')) {
  console.log(`Validated ${products.length} products and their local image mappings.`)
  process.exit(0)
}

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  throw new Error('Set VITE_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local before importing.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-08-10',
  useCdn: false,
})

const uploadedAssets = new Map()

async function uploadImage(imageClass) {
  const publicPath = imagePaths.get(imageClass)
  if (!publicPath) throw new Error(`No image file mapping found for ${imageClass}`)
  if (uploadedAssets.has(publicPath)) return uploadedAssets.get(publicPath)

  const filePath = resolve('public', publicPath.replace(/^\/assets\//, 'assets/'))
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  })
  uploadedAssets.set(publicPath, asset._id)
  return asset._id
}

console.log(`Importing ${products.length} products into Sanity…`)

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
  })
  console.log(`[${index + 1}/${products.length}] ${product.name}`)
}

console.log('Product import complete.')
