import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const selector=[
  '.page-hero',
  '.products.section-pad',
  '.shop-layout.section-pad',
  '.search-page.section-pad',
  '.collection-row',
  '.product-detail',
  '.related.section-pad',
  '.cart-page.section-pad',
  '.contact-grid.section-pad',
  '.editorial',
  '.categories.section-pad',
  '.story',
  '.newsletter',
  '.checkout-grid',
  '.order-success',
  '.empty-cart'
].join(',');

export default function RevealMotion(){
  const location=useLocation();

  useLayoutEffect(()=>{
    const elements=[...document.querySelectorAll(selector)];
    if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      elements.forEach(element=>element.classList.add('is-visible'));
      return;
    }

    elements.forEach(element=>element.classList.add('reveal-section'));
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -7% 0px'});
    elements.forEach(element=>observer.observe(element));
    return ()=>observer.disconnect();
  },[location.key]);

  return null;
}
