import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { categories, products as localProducts } from '../data/products';
import { fetchSanityProducts, sanityConfigured } from '../lib/sanity';

const CatalogContext=createContext(null);
const categoryLabels=Object.fromEntries(categories.map(category=>[category.id,category.label]));

const normalizeProduct=product=>({
  ...product,
  id:String(product.id),
  name:product.name||'Untitled product',
  category:product.category||'ankara',
  label:categoryLabels[product.category]||'Osen’ Luxe',
  price:Number(product.price)||0,
  material:product.material||'',
  badge:product.badge||'',
  description:product.description||'',
  image:product.image||''
});

export function CatalogProvider({children}){
  const [products,setProducts]=useState(localProducts);
  const [status,setStatus]=useState(sanityConfigured?'loading':'local');

  useEffect(()=>{
    if(!sanityConfigured)return;
    const controller=new AbortController();
    fetchSanityProducts({signal:controller.signal})
      .then(items=>{setProducts(items.map(normalizeProduct));setStatus('cms')})
      .catch(error=>{if(error.name!=='AbortError'){console.error('CMS catalog fallback:',error);setStatus('fallback')}});
    return ()=>controller.abort();
  },[]);

  const findProduct=useCallback(id=>products.find(product=>product.id===id),[products]);
  const value=useMemo(()=>({products,categories,findProduct,status,sanityConfigured}),[products,findProduct,status]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export const useCatalog=()=>useContext(CatalogContext);
