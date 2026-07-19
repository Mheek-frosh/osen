import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { categories, products } from '../data/products';

const filters=[['all','All'],...categories.map(category=>[category.id,category.label])];
export default function Shop(){const [params,setParams]=useSearchParams();const initial=params.get('category')||'all';const [active,setActive]=useState(initial);const items=useMemo(()=>active==='all'?products:products.filter(p=>p.category===active),[active]);const choose=value=>{setActive(value);setParams(value==='all'?{}:{category:value})};return <><section className="page-hero"><p className="eyebrow">The complete collection</p><h1>Shop Osen' Luxe</h1><p>Modern Nigerian occasionwear and accessories, designed in Abuja.</p></section><section className="shop-layout section-pad"><div className="shop-toolbar"><div className="filters">{filters.map(([value,label])=><button key={value} className={active===value?'active':''} onClick={()=>choose(value)}>{label}</button>)}</div><span className="result-count">{items.length} pieces</span></div><ProductGrid items={items}/></section></>}
