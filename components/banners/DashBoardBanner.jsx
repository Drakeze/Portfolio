'use client';
import { useEffect, useRef, useState } from 'react';
const TAGLINES = ['Your data, beautifully visualized','Metrics that actually matter','Analytics for every workflow','One dashboard to rule them all'];
const BARS = [38,63,30,82,54,72,44,60];
export default function DashBoardBanner({ onClick, href, bare }) {
  const svgRef = useRef(null);
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const bl = document.createElementNS(NS,'line');
    Object.entries({x1:2,y1:68,x2:78,y2:68,stroke:'var(--color-border-tertiary)','stroke-width':'.5'}).forEach(([k,v])=>bl.setAttribute(k,v));
    svg.appendChild(bl);
    const tx = document.createElementNS(NS,'text');
    Object.entries({x:2,y:9,'font-size':'7','font-family':'monospace',fill:'#378ADD'}).forEach(([k,v])=>tx.setAttribute(k,v));
    tx.textContent='↑ 18.4%   24,819 visits'; svg.appendChild(tx);
    BARS.forEach((val,i)=>{
      const bh=val/100*52, x=3+i*9.5, y=68-bh;
      const r=document.createElementNS(NS,'rect');
      Object.entries({x,y:68,width:7,height:0,fill:'#378ADD',rx:2,opacity:.85}).forEach(([k,v])=>r.setAttribute(k,v));
      ['height','y'].forEach((attr,ai)=>{
        const a=document.createElementNS(NS,'animate');
        Object.entries({attributeName:attr,from:ai===0?0:68,to:ai===0?bh:y,dur:'.7s',begin:`${i*.09}s`,fill:'freeze'}).forEach(([k,v])=>a.setAttribute(k,v));
        r.appendChild(a);
      });
      svg.appendChild(r);
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
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #1760AA',borderRadius:'12px',overflow:'hidden',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#378ADD'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#1760AA'}>
      <div style={{flexShrink:0}}><svg ref={svgRef} width="80" height="78" viewBox="0 0 80 78" aria-label="Bar chart"/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>DASH<span style={{color:'#1760AA'}}>BOARD</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#1760AA',fontFamily:'monospace',marginBottom:'10px'}}>Analytics · Insights</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
    </W>
  );
}
