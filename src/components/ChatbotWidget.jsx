import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const QUICK_REPLIES = ['Delivery information', 'Find my size', 'Returns', 'Contact the atelier'];

function getReply(message){
  const text=message.toLowerCase();
  if(text.includes('deliver')||text.includes('shipping'))return 'We offer complimentary Abuja delivery on orders over ₦250,000. Delivery timing is confirmed at checkout.';
  if(text.includes('size')||text.includes('fit'))return 'Our product pages include available sizes. For personal sizing support, contact the atelier and we will help you choose the right fit.';
  if(text.includes('return')||text.includes('refund'))return 'Eligible pieces may be returned within 7 days in their original condition. Custom and altered pieces are final sale.';
  if(text.includes('contact')||text.includes('atelier')||text.includes('human'))return 'The Abuja atelier is available Monday–Saturday, 10:00–18:00 WAT. Email hello@osenluxe.com for personal assistance.';
  if(text.includes('bag')||text.includes('shoe')||text.includes('dress')||text.includes('shop'))return 'You can explore occasionwear, bags, and shoes in our Shop. Each piece is produced in limited quantities.';
  return 'Thank you for your message. I can help with delivery, sizing, returns, products, or contacting the Abuja atelier.';
}

export default function ChatbotWidget(){
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState('');
  const [messages,setMessages]=useState([{id:1,from:'bot',text:"Welcome to Osen' Luxe. How may I assist you today?"}]);
  const endRef=useRef(null);

  useEffect(()=>{if(open)endRef.current?.scrollIntoView({behavior:'smooth'})},[messages,open]);

  const send=text=>{
    const value=text.trim();
    if(!value)return;
    const stamp=Date.now();
    setMessages(current=>[...current,{id:stamp,from:'user',text:value},{id:stamp+1,from:'bot',text:getReply(value)}]);
    setInput('');
  };

  return <div className={`chatbot ${open?'is-open':''}`}>
    <section className="chat-panel" aria-hidden={!open} aria-label="Osen' Luxe assistant">
      <header className="chat-head"><div><span>OL</span><p><strong>Osen Concierge</strong><small>Typically replies instantly</small></p></div><button onClick={()=>setOpen(false)} aria-label="Close chat">×</button></header>
      <div className="chat-messages">
        {messages.map(message=><div key={message.id} className={`chat-message ${message.from}`}>{message.text}</div>)}
        {messages.length===1&&<div className="chat-quick">{QUICK_REPLIES.map(reply=><button key={reply} onClick={()=>send(reply)}>{reply}</button>)}</div>}
        <div ref={endRef}/>
      </div>
      <form className="chat-form" onSubmit={event=>{event.preventDefault();send(input)}}><input value={input} onChange={event=>setInput(event.target.value)} placeholder="Type your message…" aria-label="Chat message"/><button aria-label="Send message"><svg viewBox="0 0 24 24"><path d="m4 12 16-8-5 16-3-6-8-2Z"/><path d="m12 14 8-10"/></svg></button></form>
      <Link className="chat-contact" to="/contact" onClick={()=>setOpen(false)}>Speak with the atelier</Link>
    </section>
    <button className="chat-launcher" onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-label={open?'Close Osen Concierge':'Open Osen Concierge'}>{open?<span>×</span>:<svg viewBox="0 0 24 24"><path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.7V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>}</button>
  </div>;
}
