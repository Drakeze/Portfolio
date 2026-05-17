'use client';
import { useEffect, useRef, useState } from 'react';
const TAGLINES = ['Thoughts, code, and everything else','Writing for developers','Dev logs and deep dives','Your voice in the ecosystem'];
const POSTS = [
  {date:'May 14',title:'How I Built My Dev Pipeline'},
  {date:'May 10',title:'Setting Up the Omniterm'},
  {date:'May 6', title:'My Thoughts on Rust in 2026'},
  {date:'Apr 29',title:'Stream Setup Guide v2'},
  {date:'Apr 22',title:'The Polyglot Journey Begins'},
  {date:'Apr 15',title:'Learning Lua the Hard Way'},
];
export default function DevLogBanner({ onClick, href, bare }) {
  const postsRef = useRef(null);
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  useEffect(() => {
    const el = postsRef.current; if (!el) return;
    [...POSTS,...POSTS].forEach(({date,title}) => {
      const r = document.createElement('div');
      r.style.cssText='display:flex;align-items:baseline;gap:6px;padding:2px 0;border-bottom:.5px solid var(--color-border-tertiary);height:19px;overflow:hidden';
      r.innerHTML=`<span style="font-size:8px;color:var(--color-text-secondary);font-family:monospace;flex-shrink:0;white-space:nowrap">${date}</span><span style="font-size:9px;color:var(--color-text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${title}</span>`;
      el.appendChild(r);
    });
    el.style.animation='devlogScroll 14s linear infinite';
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
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #0A8060',borderRadius:'12px',overflow:'hidden',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#1D9E75'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#0A8060'}>
      <div style={{flexShrink:0,width:'80px',height:'78px',overflow:'hidden'}}>
        <div ref={postsRef}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>DEV<span style={{color:'#0A8060'}}>LOG</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#0A8060',fontFamily:'monospace',marginBottom:'10px'}}>Posts · Thoughts · Guides</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
      <style>{`@keyframes devlogScroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}`}</style>
    </W>
  );
}
