export const PRODUCTS = [
  {id:'adun-dress',name:'Adùn Sculpted Dress',category:'wear',categoryLabel:'Ready-to-wear',price:285000,material:'Structured Ankara jacquard',image:'sheet-dress',badge:'New',description:'A precise, corset-inspired occasion silhouette shaped in rich burgundy and antique-gold jacquard.'},
  {id:'iye-bag',name:'Iye Top Handle',category:'bags',categoryLabel:'Bags',price:195000,material:'Oxblood pebbled leather',image:'sheet-bag',badge:'Signature',description:'A poised top-handle bag finished with a sculptural brushed-gold clasp and considered interior.'},
  {id:'zuri-mule',name:'Zuri Heeled Mule',category:'shoes',categoryLabel:'Shoes',price:135000,material:'Leather & woven textile',image:'sheet-shoes',badge:'Limited',description:'An elegant open-toe mule with a woven Ankara inset and balanced architectural heel.'},
  {id:'aso-clutch',name:'Aṣọ Evening Clutch',category:'bags',categoryLabel:'Bags',price:148000,material:'Woven jacquard & brass',image:'sheet-clutch',badge:'',description:'A compact evening clutch framed in warm brass and wrapped in richly woven geometric textile.'},
  {id:'temi-dress',name:'Témi Column Dress',category:'wear',categoryLabel:'Ready-to-wear',price:320000,material:'Hand-finished wax print',image:'sheet-dress',badge:'Exclusive',description:'An elongated evening column with a softly sculpted shoulder and hand-finished waist detail.'},
  {id:'naya-mini',name:'Naya Mini Handle',category:'bags',categoryLabel:'Bags',price:175000,material:'Burgundy calf leather',image:'sheet-bag',badge:'',description:'Our signature bag scaled down for evenings, with a polished top handle and suede-lined interior.'},
  {id:'kemi-mule',name:'Kémi Woven Mule',category:'shoes',categoryLabel:'Shoes',price:142000,material:'Nappa leather & jacquard',image:'sheet-shoes',badge:'New',description:'A versatile heeled mule balancing soft nappa leather with an Osen woven textile panel.'},
  {id:'ile-clutch',name:'Ilé Frame Clutch',category:'bags',categoryLabel:'Bags',price:155000,material:'Woven textile & gold frame',image:'sheet-clutch',badge:'Limited',description:'A jewel-like frame clutch crafted for celebrations, with a removable fine-chain strap.'}
];

export const formatNaira = value => `₦${value.toLocaleString('en-NG')}`;
export const productById = id => PRODUCTS.find(product => product.id === id) || PRODUCTS[0];

export function getCart(){
  try{return JSON.parse(localStorage.getItem('osen-cart')) || {}}catch{return {}}
}
function saveCart(cart){localStorage.setItem('osen-cart',JSON.stringify(cart));document.dispatchEvent(new CustomEvent('cartchange'))}
export function addToCart(id,quantity=1){const cart=getCart();cart[id]=(cart[id]||0)+quantity;saveCart(cart)}
export function setCartQuantity(id,quantity){const cart=getCart();if(quantity<=0)delete cart[id];else cart[id]=quantity;saveCart(cart)}
export function clearCart(){saveCart({})}
export function cartCount(){return Object.values(getCart()).reduce((sum,qty)=>sum+qty,0)}

export function productCard(product){return `
  <article class="product-card" data-category="${product.category}">
    <div class="product-image sheet ${product.image}">
      ${product.badge?`<span class="tag">${product.badge}</span>`:''}
      <a class="product-hit" href="/product.html?id=${product.id}" aria-label="View ${product.name}"></a>
      <button class="quick-add" data-product-id="${product.id}">Quick add</button>
    </div>
    <div class="product-info"><div><h3><a href="/product.html?id=${product.id}">${product.name}</a></h3><p>${product.material}</p></div><strong>${formatNaira(product.price)}</strong></div>
  </article>`}

export function showToast(message){
  const toast=document.querySelector('.toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(window.osenToast);window.osenToast=setTimeout(()=>toast.classList.remove('show'),2400)
}

export function bindStoreUI(root=document){
  const updateCount=()=>root.querySelectorAll('.cart-count').forEach(el=>el.textContent=cartCount());updateCount();document.addEventListener('cartchange',updateCount);
  root.querySelectorAll('.quick-add').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const product=productById(button.dataset.productId);addToCart(product.id);showToast(`${product.name} added to your bag`)}));
}
