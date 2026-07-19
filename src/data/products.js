export const categories = [
  {id:'ankara',label:'Africa Fabrics (Ankara)',shortLabel:'Ankara',image:'image-ank1',title:'Africa Fabrics',copy:'Expressive Ankara pieces grounded in colour, story, and everyday elegance.'},
  {id:'laces',label:'Laces',image:'sheet-dress',title:'Laces',copy:'Refined lace and occasion materials selected for memorable celebrations.'},
  {id:'men-materials',label:'Men materials',image:'image-menwears',title:'Men Materials',copy:'Distinguished materials for traditional and contemporary menswear.'},
  {id:'shoes',label:'Shoes',image:'sheet-shoes',title:'Shoes',copy:'Considered heels and statement footwear for a confident arrival.'},
  {id:'slippers',label:'Slippers',image:'sheet-shoes',title:'Slippers',copy:'Polished comfort with distinctive Nigerian textile details.'},
  {id:'handbags',label:'Handbags',image:'sheet-bag',title:'Handbags',copy:'Structured leather and textile bags designed to complete the look.'},
  {id:'jewellery',label:'Jewellery',image:'sheet-clutch',title:'Jewellery',copy:'Finishing pieces with warm metallic details and sculptural character.'}
];

export const products = [
  {id:'adara-ankara-gown',name:'Adára Ankara Gown',category:'ankara',label:'Africa Fabrics (Ankara)',price:98000,material:'Premium African wax cotton',image:'image-ank1',badge:'New',description:'A flowing Ankara gown in warm cocoa, coral, and amber tones with a richly finished neckline.'},
  {id:'amethyst-ankara-gown',name:'Amethyst Ankara Gown',category:'ankara',label:'Africa Fabrics (Ankara)',price:92000,material:'Hand-finished Ankara cotton',image:'image-ank2',badge:'New',description:'A relaxed purple Ankara gown featuring geometric motifs and tactile patchwork accents.'},
  {id:'adun-dress',name:'Adùn Sculpted Lace',category:'laces',label:'Laces',price:285000,material:'Structured lace jacquard',image:'sheet-dress',badge:'Signature',description:'A precise, corset-inspired occasion silhouette shaped in rich burgundy and antique-gold lace.'},
  {id:'temi-dress',name:'Témi Celebration Lace',category:'laces',label:'Laces',price:320000,material:'Hand-finished ceremonial lace',image:'sheet-dress',badge:'Exclusive',description:'An elongated celebration silhouette with a softly sculpted shoulder and hand-finished waist detail.'},
  {id:'noble-men-material',name:'Noble Brocade Material',category:'men-materials',label:'Men materials',price:75000,material:'Premium woven brocade',image:'image-menwears',badge:'New',description:'A distinguished woven material selected for refined kaftans and contemporary traditional tailoring.'},
  {id:'zuri-mule',name:'Zuri Heeled Shoe',category:'shoes',label:'Shoes',price:135000,material:'Leather & woven textile',image:'sheet-shoes',badge:'Limited',description:'An elegant open-toe heel with a woven Ankara inset and balanced architectural shape.'},
  {id:'kemi-slipper',name:'Kémi Woven Slipper',category:'slippers',label:'Slippers',price:82000,material:'Nappa leather & jacquard',image:'sheet-shoes',badge:'New',description:'An easy statement slipper balancing soft nappa leather with an Osen woven textile panel.'},
  {id:'iye-bag',name:'Iye Top Handle',category:'handbags',label:'Handbags',price:195000,material:'Oxblood pebbled leather',image:'sheet-bag',badge:'Signature',description:'A poised top-handle bag finished with a sculptural brushed-gold clasp and considered interior.'},
  {id:'naya-mini',name:'Naya Mini Handbag',category:'handbags',label:'Handbags',price:175000,material:'Burgundy calf leather',image:'sheet-bag',badge:'',description:'Our signature handbag scaled down for evenings, with a polished top handle and suede-lined interior.'},
  {id:'ile-jewel',name:'Ilé Statement Jewel',category:'jewellery',label:'Jewellery',price:68000,material:'Woven textile & gold finish',image:'sheet-clutch',badge:'Limited',description:'A jewel-like finishing piece crafted for celebrations with warm gold detailing.'}
];

export const formatNaira = value => `₦${value.toLocaleString('en-NG')}`;
export const findProduct = id => products.find(product => product.id === id);
