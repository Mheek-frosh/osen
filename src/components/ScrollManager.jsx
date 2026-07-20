import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const positions=new Map();

function getSavedPosition(key){
  if(positions.has(key))return positions.get(key);
  try{
    const saved=sessionStorage.getItem(`osen-scroll-${key}`);
    return saved?JSON.parse(saved):null;
  }catch{
    return null;
  }
}

function savePosition(key,position){
  positions.set(key,position);
  try{sessionStorage.setItem(`osen-scroll-${key}`,JSON.stringify(position))}catch{
    // In-memory restoration still works when session storage is unavailable.
  }
}

export default function ScrollManager(){
  const location=useLocation();
  const navigationType=useNavigationType();

  useEffect(()=>{
    const previous=window.history.scrollRestoration;
    window.history.scrollRestoration='manual';
    return ()=>{window.history.scrollRestoration=previous};
  },[]);

  useLayoutEffect(()=>{
    let frame;
    const saved=navigationType==='POP'?getSavedPosition(location.key):null;

    if(saved){
      frame=window.requestAnimationFrame(()=>window.scrollTo({left:saved.x,top:saved.y,behavior:'auto'}));
    }else{
      window.scrollTo({left:0,top:0,behavior:'auto'});
    }

    return ()=>{
      if(frame)window.cancelAnimationFrame(frame);
      savePosition(location.key,{x:window.scrollX,y:window.scrollY});
    };
  },[location.key,navigationType]);

  return null;
}
