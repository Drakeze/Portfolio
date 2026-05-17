'use client';
import { useEffect, useRef, useState } from 'react';
const TAGLINES = ['Learn every language. Own the stack.','Code in any language, anywhere','Your knowledge, organized','The polyglot developer vault'];
const LANGS = [
  {name:'Rust',  color:'#C94C2A',code:'fn main() {\n  println!("hi!");\n}'},
  {name:'Python',color:'#3B6D11',code:'def hi(name):\n  return f"Hi {name}"'},
  {name:'Lua',   color:'#4A42A8',code:'function greet(n)\n  return "hi "..n\nend'},
  {name:'Ruby',  color:'#D85A30',code:'def hi(n)\n  "Hello #{n}"\nend'},
  {name:'Go',    color:'#1760AA',code:'func main() {\n  fmt.Println("hi")\n}'},
  {name:'JS',    color:'#BA7517',code:'const hi = n =>\n  `Hello ${n}`'},
];
export default function StudyVaultBanner({ onClick, href, bare }) {
  const [lang, setLang] = useState(LANGS[0]);
  const [typed, setTyped] = useState('');
  const [tlIdx, setTlIdx] = useState(0);
  const [tlFade, setTlFade] = useState(true);
  const liRef = useRef(0);
  useEffect(() => {
    let ci = 0, timeoutId;
    function typeNext() {
      const l = LANGS[liRef.current];
      setLang(l); setTyped(''); ci = 0;
      function t() {
        if (ci < l.code.length) { setTyped(l.code.substring(0, ++ci)); timeoutId = setTimeout(t, 42 + Math.random()*22); }
        else { timeoutId = setTimeout(() => { liRef.current = (liRef.current+1)%LANGS.length; typeNext(); }, 2400); }
      }
      t();
    }
    const startId = setTimeout(typeNext, 500);
    return () => { clearTimeout(startId); clearTimeout(timeoutId); };
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
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #4A42A8',borderRadius:'12px',overflow:'hidden',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#7F77DD'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#4A42A8'}>
      <div style={{flexShrink:0,width:'80px',height:'78px',background:'var(--color-background-secondary)',border:'.5px solid var(--color-border-secondary)',borderRadius:'6px',padding:'6px',boxSizing:'border-box',overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'3px',marginBottom:'5px'}}>
          {[0,1,2].map(i=><span key={i} style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--color-border-secondary)',display:'inline-block'}}/>)}
          <span style={{fontSize:'8px',fontFamily:'monospace',fontWeight:500,marginLeft:'4px',color:lang.color}}>{lang.name}</span>
        </div>
        <pre style={{fontSize:'8px',fontFamily:'monospace',color:'var(--color-text-primary)',margin:0,lineHeight:1.5,whiteSpace:'pre'}}>{typed}</pre>
        <span style={{fontSize:'9px',fontFamily:'monospace',color:'#4A42A8',animation:'vaultBlink 1s step-end infinite'}}>▌</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>STUDY<span style={{color:'#4A42A8'}}>VAULT</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#4A42A8',fontFamily:'monospace',marginBottom:'10px'}}>Polyglot · Learn · Build</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4,opacity:tlFade?1:0,transition:'opacity .4s'}}>{TAGLINES[tlIdx]}</div>
      </div>
      <style>{`@keyframes vaultBlink{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
    </W>
  );
}
