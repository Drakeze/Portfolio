'use client';
import { useEffect, useState } from 'react';
const TAGLINES = ['Everything you need to create','Presets, overlays, and more','Your creative toolkit','Built for your workflow'];
const ITEMS = [{icon:'🎮',label:'Stream Overlays',price:'$9'},{icon:'🎨',label:'LUT Bundle',price:'$24'},{icon:'🎵',label:'Audio Pack',price:'$12'}];
export default function CreatorStoreBanner({ onClick, href }) {
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setTlFade(false);
      setTimeout(() => { setTlIdx(i=>(i+1)%TAGLINES.length); setTlFade(true); }, 400);
    }, 3600);
    return () => clearInterval(id);
  }, []);
  const W = href ? 'a' : 'div';
  return (
    <W href={href} onClick={onClick} style={{display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #BA7517',borderRadius:'12px',overflow:'hidden',position:'relative',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={e=>e.currentTarget.style.borderLeftColor='#EF9F27'}
      onMouseLeave={e=>e.currentTarget.style.borderLeftColor='#BA7517'}>
      <div style={{flexShrink:0,width:'80px',height:'78px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'7px'}}>
        {ITEMS.map(({icon,label,price},i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',background:'var(--color-background-secondary)',border:'.5px solid var(--color-border-secondary)',borderRadius:'6px',padding:'4px 6px',animation:`storeSlide .5s ${.3+i*.18}s ease-out both`}}>
            <span style={{fontSize:'11px',flexShrink:0}}>{icon}</span>
            <span style={{fontSize:'9px',fontFamily:'monospace',color:'var(--color-text-primary)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{label}</span>
            <span style={{fontSize:'9px',fontFamily:'monospace',color:'#BA7517',fontWeight:500,flexShrink:0}}>{price}</span>
          </div>
        ))}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>CREATOR<span style={{color:'#BA7517'}}>STORE</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#BA7517',fontFamily:'monospace',marginBottom:'10px'}}>Presets · Assets · Tools</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
      <style>{`@keyframes storeSlide{from{transform:translateX(-18px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </W>
  );
}
