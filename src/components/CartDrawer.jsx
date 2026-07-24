import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../data/products';
import { BagIcon } from './Icons';

export default function CartDrawer({open,onClose}){
  const {lines,count,subtotal,setQuantity}=useCart();
  const closeButtonRef=useRef(null);

  useEffect(()=>{
    if(!open)return undefined;

    const closeOnEscape=event=>{
      if(event.key==='Escape')onClose();
    };

    document.addEventListener('keydown',closeOnEscape);
    document.body.classList.add('drawer-lock');
    closeButtonRef.current?.focus();

    return()=>{
      document.removeEventListener('keydown',closeOnEscape);
      document.body.classList.remove('drawer-lock');
    };
  },[open,onClose]);

  return <>
    <button
      type="button"
      className={`cart-overlay ${open?'open':''}`}
      onClick={onClose}
      aria-label="Close shopping cart"
      tabIndex={open?0:-1}
    />
    <aside
      className={`cart-drawer ${open?'open':''}`}
      role="dialog"
      aria-modal={open?'true':undefined}
      aria-hidden={!open}
      aria-label="Shopping cart"
      inert={!open}
    >
      <div className="cart-drawer-head">
        <strong>Your cart ({count})</strong>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close shopping cart">×</button>
      </div>

      {!lines.length?<div className="drawer-empty">
        <BagIcon/>
        <p>Your cart is empty</p>
        <Link className="drawer-primary" to="/shop" onClick={onClose}>Start shopping</Link>
      </div>:<>
        <div className="drawer-lines">
          {lines.map(({product,qty})=><article className="drawer-line" key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className={`drawer-thumb sheet ${product.image}`}
              onClick={onClose}
              aria-label={`View ${product.name}`}
            />
            <div className="drawer-item-info">
              <Link to={`/product/${product.id}`} onClick={onClose}><strong>{product.name}</strong></Link>
              <span>{product.material}</span>
              <b>{formatNaira(product.price)}</b>
              <div className="drawer-item-actions">
                <div className="drawer-quantity" aria-label={`Quantity for ${product.name}`}>
                  <button type="button" onClick={()=>setQuantity(product.id,qty-1)} aria-label={`Decrease ${product.name} quantity`}>−</button>
                  <span aria-live="polite">{qty}</span>
                  <button type="button" onClick={()=>setQuantity(product.id,qty+1)} aria-label={`Increase ${product.name} quantity`}>+</button>
                </div>
                <button type="button" className="drawer-remove" onClick={()=>setQuantity(product.id,0)}>Remove</button>
              </div>
            </div>
          </article>)}
        </div>
        <div className="drawer-summary">
          <p><strong>Subtotal</strong><b>{formatNaira(subtotal)}</b></p>
          <small>Shipping and taxes calculated at checkout</small>
          <Link className="drawer-primary" to="/checkout" onClick={onClose}>Checkout</Link>
          <Link className="continue-shopping" to="/shop" onClick={onClose}>Continue shopping</Link>
        </div>
      </>}
    </aside>
  </>;
}
