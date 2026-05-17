'use client';
import { useEffect, useRef, useState } from 'react';
const TAGLINES = ['Your content, live and direct','Stream it. Clip it. Share it.','Built for creators, by a creator','Go live anywhere, anytime'];
const BAR_SCALES = [.5,.8,.35,.9,.55,.75,.4,.85,.6,.7,.45,.9,.55,.8,.4,.65];
export default function StreamHubBanner({ onClick, href, bare }) {
  const wfRef = useRef(null);
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  useEffect(() => {
    const bars = wfRef.current;
    if (!bars) return;
    BAR_SCALES.forEach((h, i) => {
      const b = document.createElement('div');
      const mn = .15 + Math.random() * .2, dur = .45 + Math.random() * .7;
      b.style.cssText = `width:3px;height:52px;flex-shrink:0;background:#6B21A8;border-radius:2px 2px 0 0;transform-origin:bottom;transform:scaleY(${h});animation:streamWave ${dur}s ${i*.06}s ease-in-out infinite;--mn:${mn}`;
      bars.appendChild(b);
    });
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      setTlFade(false);
      setTimeout(() => { setTlIdx(i => (i+1)%TAGLINES.length); setTlFade(true); }, 400);
    }, 3600);
    return () => clearInterval(id);
  }, []);
  const W = href ? 'a' : 'div';
  return (
    <W href={href} onClick={onClick}
      style={bare
        ? {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',overflow:'hidden',position:'relative',width:'100%',cursor:'pointer',textDecoration:'none'}
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #6B21A8',borderRadius:'12px',overflow:'hidden',position:'relative',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#9333EA'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#6B21A8'}>
      <div style={{flexShrink:0,width:'80px',height:'78px',position:'relative',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
        <div style={{position:'absolute',top:'5px',left:0,display:'flex',alignItems:'center',gap:'4px'}}>
          <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#9333EA',animation:'liveDot 1.1s ease-in-out infinite'}}/>
          <span style={{fontSize:'9px',letterSpacing:'1.5px',color:'#6B21A8',fontFamily:'monospace',fontWeight:500}}>LIVE</span>
          <span style={{fontSize:'9px',color:'var(--color-text-secondary)',fontFamily:'monospace',marginLeft:'4px'}}>1.2K</span>
        </div>
        <div ref={wfRef} style={{display:'flex',alignItems:'flex-end',gap:'2px',height:'52px'}}/>
      </div>
      <div style={{flex:1,minWidth:0,paddingLeft:'12px'}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>STREAM<span style={{color:'#6B21A8'}}>HUB</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#6B21A8',fontFamily:'monospace',marginBottom:'10px'}}>Live · On Demand</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
      <style>{`@keyframes streamWave{0%,100%{transform:scaleY(var(--mn))}50%{transform:scaleY(1)}}@keyframes liveDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.2;transform:scale(1.7)}}`}</style>
    </W>
  );
}
