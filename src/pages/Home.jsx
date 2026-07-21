import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { ArrowUpRight } from '../components/Icons';
import HeroCarousel from '../components/HeroCarousel';
import { useCatalog } from '../context/CatalogContext';

export default function Home(){
  const {products}=useCatalog();
  return <>
    <HeroCarousel/>
    <div className="ticker"><div>ELEGANT&nbsp;&nbsp; ✦ &nbsp;&nbsp;HERITAGE&nbsp;&nbsp; ✦ &nbsp;&nbsp;LUXURY&nbsp;&nbsp; ✦ &nbsp;&nbsp;CRAFTED IN ABUJA&nbsp;&nbsp; ✦ &nbsp;&nbsp;ELEGANT&nbsp;&nbsp; ✦ &nbsp;&nbsp;HERITAGE&nbsp;&nbsp; ✦ &nbsp;&nbsp;LUXURY</div></div>
    <section className="products section-pad"><div className="section-head"><div><p className="eyebrow">Freshly arrived</p><h2>New signatures</h2></div><Link className="mini-link" to="/shop">View all →</Link></div><ProductGrid items={products.slice(0,4)}/><Link className="under-link" to="/shop">View all pieces <span>→</span></Link></section>
    <section className="editorial"><img src="/assets/osen-editorial.png" alt="Osen' Luxe editorial campaign"/><div className="editorial-copy"><p className="eyebrow">Occasion, reimagined</p><h2>Dressing that<br/><em>speaks first.</em></h2><p>Confident lines, heritage textiles, and a modern Abuja point of view. Every piece is made for entrances worth remembering.</p><Link className="btn btn-light" to="/collections">Discover the edit <ArrowUpRight/></Link></div></section>
    <section className="categories section-pad"><div className="section-head"><div><p className="eyebrow">Find your statement</p><h2>Shop by category</h2></div></div><div className="category-grid category-grid-seven">{categories.map((category,index)=><Link key={category.id} to={`/shop?category=${category.id}`} className="category-card"><div className={`sheet ${category.image}`}></div><span><b>{String(index+1).padStart(2,'0')}</b><strong>{category.label}</strong><em>Explore →</em></span></Link>)}</div></section>
    <section className="story" id="story"><div className="story-mark">OL</div><div className="story-copy"><p className="eyebrow">The Osen' point of view</p><h2>Heritage is not a trend.<br/><em>It is our beginning.</em></h2><p>Osen' Luxe pairs Nigerian textile traditions with measured, modern silhouettes. Designed in Abuja in limited runs, each piece honours the hands and stories behind it.</p><Link className="under-link light-link" to="/contact">Meet the atelier <span>→</span></Link></div><div className="story-stat"><strong>Small runs.</strong><p>Thoughtfully made,<br/>never mass produced.</p></div></section>
    <Newsletter/>
  </>;
}

function Newsletter(){return <section className="newsletter"><p className="eyebrow">The Osen' list</p><h2>Private previews.<br/><em>First access.</em></h2><form onSubmit={e=>{e.preventDefault();e.currentTarget.querySelector('button').textContent="Welcome to Osen' ✓";e.currentTarget.reset()}}><input type="email" placeholder="Email address" aria-label="Email address" required/><button>Join us →</button></form><p className="form-note">By subscribing, you agree to receive Osen' Luxe news and offers.</p></section>}
