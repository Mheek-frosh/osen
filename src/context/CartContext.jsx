import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCatalog } from './CatalogContext';

const CartContext=createContext(null);
const readCart=()=>{try{return JSON.parse(localStorage.getItem('osen-cart'))||{}}catch{return {}}};

export function CartProvider({children}){
  const {findProduct,products}=useCatalog();
  const [cart,setCart]=useState(readCart);
  const [toast,setToast]=useState('');
  useEffect(()=>localStorage.setItem('osen-cart',JSON.stringify(cart)),[cart]);
  useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),2300);return()=>clearTimeout(id)},[toast]);
  const addItem=(id,qty=1)=>{setCart(current=>({...current,[id]:(current[id]||0)+qty}));setToast(`${findProduct(id)?.name||'Item'} added to your bag`)};
  const setQuantity=(id,qty)=>setCart(current=>{const next={...current};if(qty<=0)delete next[id];else next[id]=qty;return next});
  const clearCart=()=>setCart({});
  const count=Object.values(cart).reduce((sum,qty)=>sum+qty,0);
  const lines=useMemo(()=>Object.entries(cart).map(([id,qty])=>({product:findProduct(id),qty})).filter(line=>line.product),[cart,products,findProduct]);
  const subtotal=lines.reduce((sum,line)=>sum+line.product.price*line.qty,0);
  return <CartContext.Provider value={{cart,lines,count,subtotal,toast,addItem,setQuantity,clearCart}}>{children}</CartContext.Provider>;
}

export const useCart=()=>useContext(CartContext);
