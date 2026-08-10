import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'glm7nutk',
  dataset: 'production',
  apiVersion: '2026-08-10',
  useCdn: false,
  perspective: 'published',
})

const products = await client.fetch(`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    category,
    _createdAt
  }
`)

const categoryCounts = Object.fromEntries(
  Object.entries(Object.groupBy(products, product => product.category || '(missing)'))
    .map(([category, items]) => [category, items.length]),
)

console.log(JSON.stringify({categoryCounts, recent: products.slice(0, 25)}, null, 2))
