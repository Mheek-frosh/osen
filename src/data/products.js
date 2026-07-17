export const products = [
  {id:'adun-dress',name:'Adùn Sculpted Dress',category:'wear',label:'Ready-to-wear',price:285000,material:'Structured Ankara jacquard',image:'sheet-dress',badge:'New',description:'A precise, corset-inspired occasion silhouette shaped in rich burgundy and antique-gold jacquard.'},
  {id:'iye-bag',name:'Iye Top Handle',category:'bags',label:'Bags',price:195000,material:'Oxblood pebbled leather',image:'sheet-bag',badge:'Signature',description:'A poised top-handle bag finished with a sculptural brushed-gold clasp and considered interior.'},
  {id:'zuri-mule',name:'Zuri Heeled Mule',category:'shoes',label:'Shoes',price:135000,material:'Leather & woven textile',image:'sheet-shoes',badge:'Limited',description:'An elegant open-toe mule with a woven Ankara inset and balanced architectural heel.'},
  {id:'aso-clutch',name:'Aṣọ Evening Clutch',category:'bags',label:'Bags',price:148000,material:'Woven jacquard & brass',image:'sheet-clutch',badge:'',description:'A compact evening clutch framed in warm brass and wrapped in richly woven geometric textile.'},
  {id:'temi-dress',name:'Témi Column Dress',category:'wear',label:'Ready-to-wear',price:320000,material:'Hand-finished wax print',image:'sheet-dress',badge:'Exclusive',description:'An elongated evening column with a softly sculpted shoulder and hand-finished waist detail.'},
  {id:'naya-mini',name:'Naya Mini Handle',category:'bags',label:'Bags',price:175000,material:'Burgundy calf leather',image:'sheet-bag',badge:'',description:'Our signature bag scaled down for evenings, with a polished top handle and suede-lined interior.'},
  {id:'kemi-mule',name:'Kémi Woven Mule',category:'shoes',label:'Shoes',price:142000,material:'Nappa leather & jacquard',image:'sheet-shoes',badge:'New',description:'A versatile heeled mule balancing soft nappa leather with an Osen woven textile panel.'},
  {id:'ile-clutch',name:'Ilé Frame Clutch',category:'bags',label:'Bags',price:155000,material:'Woven textile & gold frame',image:'sheet-clutch',badge:'Limited',description:'A jewel-like frame clutch crafted for celebrations, with a removable fine-chain strap.'}
];

export const formatNaira = value => `₦${value.toLocaleString('en-NG')}`;
export const findProduct = id => products.find(product => product.id === id);
