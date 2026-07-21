import { useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from './Icons';
import { useCatalog } from '../context/CatalogContext';

export default function SearchStrip({open,query,setQuery,onClose}){
  const {products}=useCatalog();
  const navigate=useNavigate();
  const inputRef=useRef(null);
  useEffect(()=>{if(open)inputRef.current?.focus()},[open]);
  const matches=useMemo(()=>query.trim()?products.filter(p=>`${p.name} ${p.material} ${p.label}`.toLowerCase().includes(query.toLowerCase())).slice(0,4):[],[query]);
  const submit=event=>{event.preventDefault();navigate(`/search?q=${encodeURIComponent(query)}`);onClose()};
  return <div className={`nav-search ${open?'is-open':''}`} aria-hidden={!open}>
    <form onSubmit={submit} className="nav-search-form">
      <SearchIcon/><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/>
      <button type="button" className="search-close" onClick={onClose} aria-label="Close search">×</button>
    </form>
    {query&&<div className="nav-search-results">
      {matches.length?matches.map(product=><Link key={product.id} to={`/product/${product.id}`} onClick={onClose}><span>{product.name}</span><small>{product.label}</small></Link>):<p>No pieces found.</p>}
      {matches.length>0&&<button onClick={submit}>View all results →</button>}
    </div>}
  </div>;
}
