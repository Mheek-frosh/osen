import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from './Icons';

const slides=[
  {
    image:'/assets/osen-hero.png',
    alt:"Osen' Luxe model in a black and Ankara evening dress",
    eyebrow:'Elegant · Heritage · Luxury',
    title:'Rooted in craft.',
    accent:'Made for now.',
    copy:'African fabrics, refined accessories, and memorable pieces shaped in Abuja.',
    link:'/shop',
    action:'Shop the collection'
  },
  {
    image:'/assets/osen-hero-emerald.png',
    alt:"Osen' Luxe model in a sculptural emerald and gold gown",
    eyebrow:'Modern African luxury',
    title:'Sculpted in heritage.',
    accent:'Command the room.',
    copy:'Architectural silhouettes and storied textiles, composed for unforgettable entrances.',
    link:'/collections',
    action:'Discover the edit'
  },
  {
    image:'/assets/osen-hero-sapphire.png',
    alt:"Osen' Luxe model in a sapphire blue lace evening gown",
    eyebrow:'Occasion, reimagined',
    title:'Lace with presence.',
    accent:'Made for moments.',
    copy:'Rich colour, intricate texture, and a confident point of view for every celebration.',
    link:'/shop?category=laces',
    action:'Explore the laces'
  }
];

export default function HeroCarousel(){
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const total=slides.length;
  const move=direction=>setActive(current=>(current+direction+total)%total);

  useEffect(()=>{
    if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const timer=window.setInterval(()=>move(1),6500);
    return ()=>window.clearInterval(timer);
  },[paused]);

  const slide=slides[active];
  return <section
    className="hero hero-carousel"
    aria-roledescription="carousel"
    aria-label="Osen' Luxe campaign highlights"
    onMouseEnter={()=>setPaused(true)}
    onMouseLeave={()=>setPaused(false)}
    onFocusCapture={()=>setPaused(true)}
    onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}}
  >
    <div className="hero-slides">
      {slides.map((item,index)=><div className={`hero-slide ${index===active?'active':''}`} aria-hidden={index!==active} key={item.image}>
        <img src={item.image} alt={index===active?item.alt:''} loading={index===0?'eager':'lazy'} fetchPriority={index===0?'high':'auto'}/>
      </div>)}
    </div>
    <div className="hero-copy hero-copy-animated" key={slide.image}>
      <p className="eyebrow">{slide.eyebrow}</p>
      <h1>{slide.title}<br/><em>{slide.accent}</em></h1>
      <p className="hero-sub">{slide.copy}</p>
      <Link className="btn btn-dark" to={slide.link}>{slide.action} <ArrowUpRight/></Link>
    </div>
    <div className="hero-carousel-controls">
      <div className="hero-dots" aria-label="Choose a campaign slide">
        {slides.map((item,index)=><button type="button" className={index===active?'active':''} onClick={()=>setActive(index)} aria-label={`Show slide ${index+1}: ${item.title}`} aria-current={index===active?'true':undefined} key={item.image}><span/></button>)}
      </div>
      <div className="hero-arrows">
        <span className="hero-counter">{String(active+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
        <button type="button" onClick={()=>move(-1)} aria-label="Previous campaign slide">←</button>
        <button type="button" onClick={()=>move(1)} aria-label="Next campaign slide">→</button>
      </div>
    </div>
  </section>;
}
