import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../data/products';

const ACCOUNT_NUMBER='6674700463';
const WHATSAPP_NUMBER='2347054885172';

export default function Checkout(){
  const {lines,subtotal,clearCart}=useCart();
  const [complete,setComplete]=useState(false);
  const [paymentOpen,setPaymentOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const [checkoutDetails,setCheckoutDetails]=useState(null);
  const [orderReference]=useState(()=>`OL-${Date.now().toString().slice(-6)}`);

  useEffect(()=>{
    if(!paymentOpen)return undefined;
    const closeOnEscape=event=>{if(event.key==='Escape')setPaymentOpen(false)};
    document.addEventListener('keydown',closeOnEscape);
    document.body.style.overflow='hidden';
    return()=>{
      document.removeEventListener('keydown',closeOnEscape);
      document.body.style.overflow='';
    };
  },[paymentOpen]);

  const submit=event=>{
    event.preventDefault();
    const formData=new FormData(event.currentTarget);
    setCheckoutDetails(Object.fromEntries(formData.entries()));
    setPaymentOpen(true);
  };

  const copyAccount=async()=>{
    try{
      await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      setCopied(true);
      window.setTimeout(()=>setCopied(false),1800);
    }catch{
      setCopied(false);
    }
  };

  const confirmTransfer=()=>{
    const productDetails=lines.map(({product,qty})=>
      `• ${product.name} — Qty ${qty} — ${formatNaira(product.price*qty)}`
    ).join('\n');
    const deliveryDetails=checkoutDetails?
      `${checkoutDetails.firstName} ${checkoutDetails.lastName}\n${checkoutDetails.address}, ${checkoutDetails.city}, ${checkoutDetails.state}\nPhone: ${checkoutDetails.phone}\nEmail: ${checkoutDetails.email}`:
      'Customer details submitted through the website';
    const message=[
      `Hello Osen' Luxe, I have made payment for this order.`,
      '',
      `Order reference: ${orderReference}`,
      '',
      'Order details:',
      productDetails,
      '',
      `Total paid: ${formatNaira(subtotal)}`,
      'Bank: Moniepoint',
      `Account number: ${ACCOUNT_NUMBER}`,
      '',
      'Customer / delivery details:',
      deliveryDetails,
      '',
      'Please confirm my payment and order. I will attach my transfer receipt here.'
    ].join('\n');
    const whatsappUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setPaymentOpen(false);
    clearCart();
    setComplete(true);
    window.location.href=whatsappUrl;
  };

  return <>
    <header className="checkout-nav">
      <Link to="/cart">← Back to bag</Link>
      <Link className="wordmark" to="/">OSEN' LUXE</Link>
      <span>Secure checkout</span>
    </header>

    <main className="checkout-page section-pad">
      {complete?<div className="order-success">
        <span>✓</span>
        <p className="eyebrow">Payment submitted · {orderReference}</p>
        <h1>Thank you.</h1>
        <p>Your order has been received and is awaiting transfer verification. Please keep your payment receipt until your order is confirmed.</p>
        <Link className="btn btn-dark" to="/">Return home <ArrowUpRight/></Link>
      </div>:!lines.length?<div className="empty-cart">
        <h2>Your bag is empty.</h2>
        <Link className="btn btn-dark" to="/shop">Shop the collection <ArrowUpRight/></Link>
      </div>:<div className="checkout-grid">
        <form className="checkout-form" onSubmit={submit}>
          <p className="eyebrow">Complete your order</p>
          <h1>Checkout</h1>
          <fieldset>
            <legend>Contact</legend>
            <label>Email address<input name="email" type="email" required placeholder="you@example.com"/></label>
            <label>Phone number<input name="phone" type="tel" required placeholder="+234"/></label>
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <div className="form-split">
              <label>First name<input name="firstName" required/></label>
              <label>Last name<input name="lastName" required/></label>
            </div>
            <label>Address<input name="address" required placeholder="Street and house number"/></label>
            <div className="form-split">
              <label>City<input name="city" required defaultValue="Abuja"/></label>
              <label>State<select name="state" required defaultValue="Abuja FCT"><option>Abuja FCT</option><option>Rivers</option><option>Oyo</option><option>Kano</option></select></label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Payment method</legend>
            <div className="payment-note"><strong>Bank transfer only</strong><span>Transfer instructions and your exact order total will appear after you place your order.</span></div>
          </fieldset>
          <button className="btn btn-dark">Place order <ArrowUpRight/></button>
        </form>

        <aside className="checkout-items">
          {lines.map(({product,qty})=><div className="checkout-item" key={product.id}>
            <div className={`checkout-thumb sheet ${product.image}`}></div>
            <p><strong>{product.name}</strong><span>Qty {qty}</span></p>
            <b>{formatNaira(product.price*qty)}</b>
          </div>)}
          <div className="checkout-total"><span>Total</span><strong>{formatNaira(subtotal)}</strong></div>
        </aside>
      </div>}
    </main>

    {paymentOpen&&<div className="transfer-modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)setPaymentOpen(false)}}>
      <section className="transfer-modal" role="dialog" aria-modal="true" aria-labelledby="transfer-title">
        <button className="transfer-modal-close" type="button" onClick={()=>setPaymentOpen(false)} aria-label="Close payment instructions">×</button>
        <p className="eyebrow">Bank transfer payment</p>
        <h2 id="transfer-title">Please make your transfer</h2>
        <p className="transfer-intro">Use the details below to complete your order. Your items will be processed after the transfer is verified.</p>
        <div className="transfer-details">
          <div><span>Bank name</span><strong>Moniepoint</strong></div>
          <div className="account-number-row"><span>Account number</span><strong>{ACCOUNT_NUMBER}</strong></div>
          <button type="button" className="copy-account" onClick={copyAccount}>{copied?'Copied ✓':'Copy number'}</button>
          <div><span>Account name</span><strong>Osen' Luxe</strong></div>
          <div><span>Amount to transfer</span><strong>{formatNaira(subtotal)}</strong></div>
          <div><span>Payment reference</span><strong>{orderReference}</strong></div>
        </div>
        <div className="transfer-notice">
          <strong>Before you continue</strong>
          <p>Use <b>{orderReference}</b> as the transfer narration where possible. Please keep your receipt as proof of payment. Your order remains pending until payment is confirmed.</p>
        </div>
        <button type="button" className="btn btn-dark transfer-confirm" onClick={confirmTransfer}>I have made the transfer <ArrowUpRight/></button>
        <button type="button" className="transfer-cancel" onClick={()=>setPaymentOpen(false)}>Go back to checkout</button>
      </section>
    </div>}
  </>;
}
