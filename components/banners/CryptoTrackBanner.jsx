'use client';
import { useEffect, useRef, useState } from 'react';
const TAGLINES = ['Track every move of the market','Data-driven crypto decisions','Real-time prices, your way','Your portfolio at a glance'];
const CANDLES = [{x:4,o:38,c:52,h:57,l:34},{x:15,o:52,c:44,h:56,l:40},{x:26,o:44,c:63,h:67,l:40},{x:37,o:63,c:55,h:67,l:51},{x:48,o:55,c:73,h:77,l:52},{x:59,o:73,c:65,h:76,l:61},{x:70,o:65,c:79,h:83,l:62}];
const toY = p => 10 + (100-p)/100*58;
export default function CryptoTrackBanner({ onClick, href, bare }) {
  const svgRef = useRef(null);
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const bl = document.createElementNS(NS,'line');
    Object.entries({x1:0,y1:70,x2:80,y2:70,stroke:'var(--color-border-tertiary)','stroke-width':'.5'}).forEach(([k,v])=>bl.setAttribute(k,v));
    svg.appendChild(bl);
    const tx = document.createElementNS(NS,'text');
    Object.entries({x:2,y:8,'font-size':'7','font-family':'monospace',fill:'#3B6D11'}).forEach(([k,v])=>tx.setAttribute(k,v));
    tx.textContent='BTC  ↑ 3.2%'; svg.appendChild(tx);
    CANDLES.forEach(({x,o,c,h,l},i)=>{
      const up=c>o, col=up?'#3B6D11':'#C94C2A';
      const g=document.createElementNS(NS,'g');
      g.setAttribute('opacity','0');
      const wk=document.createElementNS(NS,'line');
      Object.entries({x1:x+4,y1:toY(h),x2:x+4,y2:toY(l),stroke:col,'stroke-width':'1'}).forEach(([k,v])=>wk.setAttribute(k,v));
      g.appendChild(wk);
      const bd=document.createElementNS(NS,'rect');
      const top=Math.min(o,c),bot=Math.max(o,c);
      Object.entries({x,y:toY(bot),width:8,height:Math.max(2,toY(top)-toY(bot)),fill:col,rx:1}).forEach(([k,v])=>bd.setAttribute(k,v));
      g.appendChild(bd);
      const animOp=document.createElementNS(NS,'animate');
      Object.entries({attributeName:'opacity',from:'0',to:'1',dur:'.5s',begin:`${i*.09}s`,fill:'freeze'}).forEach(([k,v])=>animOp.setAttribute(k,v));
      g.appendChild(animOp);
      const animTr=document.createElementNS(NS,'animateTransform');
      Object.entries({attributeName:'transform',type:'translate',from:'0,4',to:'0,0',dur:'.5s',begin:`${i*.09}s`,fill:'freeze'}).forEach(([k,v])=>animTr.setAttribute(k,v));
      g.appendChild(animTr);
      svg.appendChild(g);
    });
  }, []);
  useEffect(() => {
    const id = setInterval(() => { setTlFade(false); setTimeout(()=>{setTlIdx(i=>(i+1)%TAGLINES.length);setTlFade(true)},400); }, 3600);
    return () => clearInterval(id);
  }, []);
  const W = href ? 'a' : 'div';
  return (
    <W href={href} onClick={onClick}
      style={bare
        ? {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',overflow:'hidden',width:'100%',cursor:'pointer',textDecoration:'none'}
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #3B6D11',borderRadius:'12px',overflow:'hidden',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#639922'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#3B6D11'}>
      <div style={{flexShrink:0}}><svg ref={svgRef} width="80" height="78" viewBox="0 0 80 78" aria-label="Candlestick chart"/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>CRYPTO<span style={{color:'#3B6D11'}}>TRACKER</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#3B6D11',fontFamily:'monospace',marginBottom:'10px'}}>Real-Time · Portfolio</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
    </W>
  );
}
