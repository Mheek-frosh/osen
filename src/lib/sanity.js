import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'glm7nutk'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const isSanityConfigured = Boolean(projectId)

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-08-10',
      // Product edits should be visible as soon as the storefront refreshes.
      useCdn: false,
      perspective: 'published',
    })
  : null

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null

export function sanityImageUrl(source, width = 900, height = 1100) {
  if (!imageBuilder || !source) return ''
  return imageBuilder
    .image(source)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .url()
}

export const productsQuery = `
  *[_type == "product" && defined(name) && defined(price)]
  | order(_createdAt desc) {
    "id": _id,
    name,
    category,
    price,
    image,
    material,
    description,
    badge,
    soldOut,
    sortOrder
  }
`
