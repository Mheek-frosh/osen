import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {categories, normalizeCategory, products as localProducts} from '../data/products'
import {isSanityConfigured, productsQuery, sanityClient} from '../lib/sanity'

const ProductContext = createContext(null)
const categoryLabels = Object.fromEntries(categories.map(category => [category.id, category.label]))

const normalizeProduct = product => {
  const category = normalizeCategory(product.category)

  return {
    ...product,
    category,
    label: categoryLabels[category] || product.category || 'Products',
    material: product.material || categoryLabels[category] || 'Osen\' Luxe',
    description: product.description || `${product.name}, selected for the Osen' Luxe collection.`,
    soldOut: Boolean(product.soldOut),
  }
}

export function ProductProvider({children}) {
  const [products, setProducts] = useState(localProducts)
  const [loading, setLoading] = useState(isSanityConfigured)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sanityClient) return undefined

    let active = true
    let fetching = false

    const refreshProducts = () => {
      if (fetching) return
      fetching = true

      sanityClient.fetch(productsQuery)
        .then(items => {
          if (!active) return
          if (items.length) {
            const normalizedProducts = items
              .map(normalizeProduct)
              .sort((a, b) => (a.sortOrder ?? -1) - (b.sortOrder ?? -1))
            setProducts(normalizedProducts)
          }
          setError('')
        })
        .catch(fetchError => {
          if (!active) return
          console.error('Unable to load Sanity products. Using the local catalog.', fetchError)
          setError('The live catalog could not be refreshed.')
        })
        .finally(() => {
          fetching = false
          if (active) setLoading(false)
        })
    }

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') refreshProducts()
    }

    refreshProducts()
    window.addEventListener('focus', refreshProducts)
    document.addEventListener('visibilitychange', refreshWhenVisible)

    return () => {
      active = false
      window.removeEventListener('focus', refreshProducts)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [])

  const value = useMemo(() => ({
    products,
    loading,
    error,
    findProduct: id => products.find(product => product.id === id),
  }), [products, loading, error])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProducts = () => useContext(ProductContext)
