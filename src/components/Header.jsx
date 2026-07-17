import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BagIcon, InstagramIcon, MusicIcon, SearchIcon } from './Icons';
import SearchStrip from './SearchStrip';

export default function Header(){
  const {count}=useCart();const location=useLocation();
  const [searchOpen,setSearchOpen]=useState(false);const [menuOpen,setMenuOpen]=useState(false);const [query,setQuery]=useState('');
  useEffect(()=>{setSearchOpen(false);setMenuOpen(false)},[location.pathname]);
  return <>
    <header className="header-shell">
      <div className="utility-nav">
        <div className="social-links"><a href="#" aria-label="Instagram"><InstagramIcon/></a><a href="#" aria-label="TikTok"><MusicIcon/></a></div>
        <Link to="/shop" className="announcement-copy">The Ìdílé Collection is out now!</Link>
        <nav><Link to="/">Home</Link><Link to="/shop">Shop</Link><Link to="/contact">Contact</Link><button>NG Nigeria (NGN)⌄</button></nav>
      </div>
      <div className="main-nav">
        <button className="mobile-menu-button" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><i></i><i></i></button>
        <nav className="primary-links"><NavLink to="/shop">Shop</NavLink><NavLink to="/collections">Collections</NavLink></nav>
        <Link className="wordmark" to="/"><strong>OSEN LUXE</strong></Link>
        <div className="nav-tools">
          <button className="search-trigger" onClick={()=>setSearchOpen(value=>!value)}>Search <SearchIcon/></button>
          <Link to="/cart" className="bag-link">Cart <BagIcon/><span>{count}</span></Link>
          <div className="avatar" aria-label="Osen account">OL</div>
        </div>
      </div>
      <SearchStrip open={searchOpen} query={query} setQuery={setQuery} onClose={()=>setSearchOpen(false)}/>
    </header>
    <aside className={`react-drawer ${menuOpen?'open':''}`}><button onClick={()=>setMenuOpen(false)}>×</button><NavLink to="/">Home</NavLink><NavLink to="/shop">Shop</NavLink><NavLink to="/collections">Collections</NavLink><NavLink to="/contact">Contact</NavLink><NavLink to="/cart">Bag ({count})</NavLink><p>Designed in Lagos.<br/>Made for everywhere.</p></aside>
    <button className={`drawer-scrim ${menuOpen?'open':''}`} onClick={()=>setMenuOpen(false)} aria-label="Close menu"/>
  </>;
}
