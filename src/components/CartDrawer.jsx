import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../data/products';
import { BagIcon } from './Icons';
import { productImageStyle } from '../utils/productImage';

export default function CartDrawer({open,onClose}){
  const {lines,count,subtotal,setQuantity}=useCart();
  useEffect(()=>{
    if(!open)return;
    const close=event=>event.key==='Escape'&&onClose();
    document.addEventListener('keydown',close);
    document.body.classList.add('drawer-lock');
    return()=>{document.removeEventListener('keydown',close);document.body.classList.remove('drawer-lock')};
  },[open,onClose]);

  return <>
    <button className={`cart-overlay ${open?'open':''}`} onClick={onClose} aria-label="Close cart"/>
    <aside className={`cart-drawer ${open?'open':''}`} aria-hidden={!open} aria-label="Shopping cart">
      <div className="cart-drawer-head"><strong>Your cart ({count})</strong><button onClick={onClose} aria-label="Close cart">×</button></div>
      {!lines.length?<div className="drawer-empty"><BagIcon/><p>Your cart is empty</p><Link className="drawer-primary" to="/shop" onClick={onClose}>Start shopping</Link></div>:<>
        <div className="drawer-lines">{lines.map(({product,qty})=><article className="drawer-line" key={product.id}>
          <Link to={`/product/${product.id}`} className={`drawer-thumb sheet ${product.image||''}`} style={productImageStyle(product)} onClick={onClose}/>
          <div className="drawer-item-info"><Link to={`/product/${product.id}`} onClick={onClose}><strong>{product.name}</strong></Link><span>{product.material}</span><b>{formatNaira(product.price)}</b><div className="drawer-item-actions"><div className="drawer-quantity"><button onClick={()=>setQuantity(product.id,qty-1)} aria-label="Decrease quantity">−</button><span>{qty}</span><button onClick={()=>setQuantity(product.id,qty+1)} aria-label="Increase quantity">+</button></div><button className="drawer-remove" onClick={()=>setQuantity(product.id,0)}>Remove</button></div></div>
        </article>)}</div>
        <div className="drawer-summary"><p><strong>Subtotal</strong><b>{formatNaira(subtotal)}</b></p><small>Shipping & taxes calculated at checkout</small><Link className="drawer-primary" to="/checkout" onClick={onClose}>Checkout</Link><Link className="continue-shopping" to="/shop" onClick={onClose}>Continue shopping</Link></div>
      </>}
    </aside>
  </>;
}
