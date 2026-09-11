'use client';
import { useEffect, useState } from 'react';
const TAGLINES = ['Type it once, say it anywhere','Every language, one interface','From English to anywhere else','Small app, big vocabulary'];
const PAIRS = [{source:'Hello',target:'Hola',flag:'🇪🇸'},{source:'Thanks',target:'Merci',flag:'🇫🇷'},{source:'Good morning',target:'おはよう',flag:'🇯🇵'}];
export default function TranslatorBanner({ onClick, href, bare }) {
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
    <W href={href} onClick={onClick}
      style={bare
        ? {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',overflow:'hidden',position:'relative',width:'100%',cursor:'pointer',textDecoration:'none'}
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #D6336C',borderRadius:'12px',overflow:'hidden',position:'relative',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#F0568C'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#D6336C'}>
      <div style={{flexShrink:0,width:'80px',height:'78px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'7px'}}>
        {PAIRS.map(({source,target,flag},i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',background:'var(--color-background-secondary)',border:'.5px solid var(--color-border-secondary)',borderRadius:'6px',padding:'4px 6px',animation:`translatorSlide .5s ${.3+i*.18}s ease-out both`}}>
            <span style={{fontSize:'11px',flexShrink:0}}>{flag}</span>
            <span style={{fontSize:'9px',fontFamily:'monospace',color:'var(--color-text-primary)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{source} → {target}</span>
          </div>
        ))}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>TRANS<span style={{color:'#D6336C'}}>LATOR</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#D6336C',fontFamily:'monospace',marginBottom:'10px'}}>Instant · Multilingual</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
      <style>{`@keyframes translatorSlide{from{transform:translateX(-18px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </W>
  );
}
