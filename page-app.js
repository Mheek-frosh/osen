import {PRODUCTS,productById,productCard,formatNaira,getCart,addToCart,setCartQuantity,clearCart,bindStoreUI,showToast} from './store.js';

const page=document.body.dataset.page;
const menuBtn=document.querySelector('.menu-btn');
const drawer=document.querySelector('.mobile-drawer');
const scrim=document.querySelector('.scrim');
function setMenu(open){if(!drawer)return;drawer.classList.toggle('open',open);scrim.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''}
menuBtn?.addEventListener('click',()=>setMenu(true));document.querySelector('.drawer-close')?.addEventListener('click',()=>setMenu(false));scrim?.addEventListener('click',()=>setMenu(false));drawer?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
bindStoreUI(document);

function renderGrid(products){const grid=document.querySelector('[data-product-grid]');if(grid){grid.innerHTML=products.map(productCard).join('');bindStoreUI(grid)}}

if(page==='shop'){
  const queryCategory=new URLSearchParams(location.search).get('category')||'all';
  const buttons=document.querySelectorAll('.shop-filter');
  function filter(category){buttons.forEach(button=>button.classList.toggle('active',button.dataset.filter===category));renderGrid(category==='all'?PRODUCTS:PRODUCTS.filter(p=>p.category===category));document.querySelector('.result-count').textContent=`${category==='all'?PRODUCTS.length:PRODUCTS.filter(p=>p.category===category).length} pieces`}
  buttons.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));filter(queryCategory);
}

if(page==='search'){
  const input=document.querySelector('#site-search');const params=new URLSearchParams(location.search);input.value=params.get('q')||'';
  const perform=()=>{const term=input.value.trim().toLowerCase();const found=term?PRODUCTS.filter(p=>`${p.name} ${p.material} ${p.categoryLabel}`.toLowerCase().includes(term)):PRODUCTS;renderGrid(found);document.querySelector('.search-status').textContent=term?`${found.length} result${found.length===1?'':'s'} for “${input.value.trim()}”`:'Browse all pieces';history.replaceState(null,'',term?`?q=${encodeURIComponent(input.value.trim())}`:location.pathname)};
  document.querySelector('.search-form').addEventListener('submit',event=>{event.preventDefault();perform()});input.addEventListener('input',perform);perform();
}

if(page==='product'){
  const product=productById(new URLSearchParams(location.search).get('id'));
  document.title=`${product.name} — Osen Luxe`;
  document.querySelector('.product-detail').innerHTML=`<div class="detail-image sheet ${product.image}"></div><div class="detail-copy"><p class="eyebrow">${product.categoryLabel} · ${product.badge||'Osen signature'}</p><h1>${product.name}</h1><p class="detail-material">${product.material}</p><strong class="detail-price">${formatNaira(product.price)}</strong><p class="detail-description">${product.description}</p><div class="size-row"><span>Size</span><button class="active">One size</button>${product.category==='wear'?'<button>UK 10</button><button>UK 12</button>':''}</div><button class="detail-add btn btn-dark" data-product-id="${product.id}">Add to bag <span>↗</span></button><div class="detail-notes"><p>Complimentary Lagos delivery over ₦250,000</p><p>Made in limited quantities</p><p>Returns accepted within 7 days</p></div></div>`;
  document.querySelector('.detail-add').addEventListener('click',()=>{addToCart(product.id);showToast(`${product.name} added to your bag`)});
  document.querySelectorAll('.size-row button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.size-row button').forEach(b=>b.classList.remove('active'));button.classList.add('active')}));
  renderGrid(PRODUCTS.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,3));
}

if(page==='cart'){
  const container=document.querySelector('.cart-lines');
  function renderCart(){const cart=getCart();const lines=Object.entries(cart).map(([id,qty])=>({product:productById(id),qty}));
    if(!lines.length){container.innerHTML='<div class="empty-cart"><h2>Your bag is waiting.</h2><p>Discover limited-run pieces made to be remembered.</p><a class="btn btn-dark" href="/shop.html">Explore the collection <span>↗</span></a></div>';document.querySelector('.cart-summary').hidden=true;return}
    document.querySelector('.cart-summary').hidden=false;container.innerHTML=lines.map(({product,qty})=>`<article class="cart-line"><a href="/product.html?id=${product.id}" class="cart-thumb sheet ${product.image}"></a><div><p class="eyebrow">${product.categoryLabel}</p><h3><a href="/product.html?id=${product.id}">${product.name}</a></h3><p>${product.material}</p><button class="remove-item" data-id="${product.id}">Remove</button></div><div class="quantity"><button data-action="down" data-id="${product.id}">−</button><span>${qty}</span><button data-action="up" data-id="${product.id}">+</button></div><strong>${formatNaira(product.price*qty)}</strong></article>`).join('');
    const subtotal=lines.reduce((sum,{product,qty})=>sum+product.price*qty,0);document.querySelector('.subtotal').textContent=formatNaira(subtotal);document.querySelector('.total').textContent=formatNaira(subtotal);
    container.querySelectorAll('.quantity button').forEach(button=>button.addEventListener('click',()=>{const current=getCart()[button.dataset.id];setCartQuantity(button.dataset.id,button.dataset.action==='up'?current+1:current-1);renderCart()}));container.querySelectorAll('.remove-item').forEach(button=>button.addEventListener('click',()=>{setCartQuantity(button.dataset.id,0);renderCart()}));}
  renderCart();
}

if(page==='checkout'){
  const cart=getCart();const lines=Object.entries(cart).map(([id,qty])=>({product:productById(id),qty}));const summary=document.querySelector('.checkout-items');const subtotal=lines.reduce((sum,{product,qty})=>sum+product.price*qty,0);
  if(!lines.length){document.querySelector('.checkout-grid').innerHTML='<div class="empty-cart"><h2>Your bag is empty.</h2><p>Add a piece before continuing to checkout.</p><a class="btn btn-dark" href="/shop.html">Shop the collection <span>↗</span></a></div>'}
  else{summary.innerHTML=lines.map(({product,qty})=>`<div class="checkout-item"><div class="checkout-thumb sheet ${product.image}"></div><p><strong>${product.name}</strong><span>Qty ${qty}</span></p><b>${formatNaira(product.price*qty)}</b></div>`).join('')+`<div class="checkout-total"><span>Total</span><strong>${formatNaira(subtotal)}</strong></div>`;
    document.querySelector('.checkout-form').addEventListener('submit',event=>{event.preventDefault();clearCart();const reference=`OL-${Date.now().toString().slice(-6)}`;document.querySelector('.checkout-grid').innerHTML=`<div class="order-success"><span>✓</span><p class="eyebrow">Order received · ${reference}</p><h1>Thank you.</h1><p>Your Osen Luxe order is confirmed. A confirmation has been prepared for the email address supplied.</p><a class="btn btn-dark" href="/">Return home <span>↗</span></a></div>`;scrollTo({top:0,behavior:'smooth'})})}
}
