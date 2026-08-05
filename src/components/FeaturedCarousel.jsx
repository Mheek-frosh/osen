import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';

export default function FeaturedCarousel({items}){
  const viewportRef=useRef(null);
  const pausedRef=useRef(false);
  const scrollTimerRef=useRef(null);

  const getGroupWidth=()=>viewportRef.current?.querySelector('.featured-group')?.offsetWidth||0;
  const getStep=()=>{
    const viewport=viewportRef.current;
    const card=viewport?.querySelector('.product-card');
    if(!viewport||!card)return 0;
    const gap=parseFloat(getComputedStyle(viewport).getPropertyValue('--featured-gap'))||0;
    return card.getBoundingClientRect().width+gap;
  };

  const slide=direction=>{
    const viewport=viewportRef.current;
    if(!viewport)return;
    const groupWidth=getGroupWidth();
    if(direction<0&&viewport.scrollLeft<=1)viewport.scrollLeft=groupWidth;
    viewport.scrollBy({
      left:direction*getStep(),
      behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'
    });
  };

  const handleScroll=()=>{
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current=setTimeout(()=>{
      const viewport=viewportRef.current;
      const groupWidth=getGroupWidth();
      if(viewport&&groupWidth&&viewport.scrollLeft>=groupWidth)viewport.scrollLeft-=groupWidth;
    },120);
  };

  useEffect(()=>{
    const interval=setInterval(()=>{
      if(!pausedRef.current)slide(1);
    },3200);
    return()=>{
      clearInterval(interval);
      clearTimeout(scrollTimerRef.current);
    };
  },[items.length]);

  return <div
    className="featured-carousel-shell"
    onMouseEnter={()=>{pausedRef.current=true}}
    onMouseLeave={()=>{pausedRef.current=false}}
    onFocusCapture={()=>{pausedRef.current=true}}
    onBlurCapture={()=>{pausedRef.current=false}}
  >
    <div className="featured-carousel" ref={viewportRef} onScroll={handleScroll}>
      <div className="featured-track">
        <div className="featured-group">
          {items.map(product=><ProductCard key={product.id} product={product}/>)}
        </div>
        <div className="featured-group" aria-hidden="true">
          {items.map(product=><ProductCard key={`duplicate-${product.id}`} product={product}/>)}
        </div>
      </div>
    </div>
    <button className="featured-arrow featured-arrow-prev" onClick={()=>slide(-1)} aria-label="Previous featured product">←</button>
    <button className="featured-arrow featured-arrow-next" onClick={()=>slide(1)} aria-label="Next featured product">→</button>
  </div>;
}
