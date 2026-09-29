// Minimal placeholder banner, matching TranslatorBanner's href/bare contract.
// Anthony's doing the visual design pass on the Todo List webapp itself —
// this just wires the project into the grid; restyle freely.
export default function TodoBanner({ onClick, href, bare }) {
  const W = href ? 'a' : 'div';
  return (
    <W href={href} onClick={onClick}
      style={bare
        ? {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',width:'100%',cursor:'pointer',textDecoration:'none'}
        : {display:'flex',alignItems:'center',gap:'14px',padding:'1rem 1.25rem',background:'var(--color-background-primary)',border:'.5px solid var(--color-border-tertiary)',borderLeft:'3px solid #2F9E44',borderRadius:'12px',cursor:'pointer',textDecoration:'none',transition:'border-left-color .2s'}}
      onMouseEnter={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#40C057'}
      onMouseLeave={bare ? undefined : e=>e.currentTarget.style.borderLeftColor='#2F9E44'}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:'20px',fontWeight:500,color:'var(--color-text-primary)',lineHeight:1,marginBottom:'4px'}}>TODO<span style={{color:'#2F9E44'}}>LIST</span></div>
        <div style={{fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'#2F9E44',fontFamily:'monospace',marginBottom:'10px'}}>C++ · WebAssembly</div>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',lineHeight:1.4}}>Real C++ running in your browser</div>
      </div>
    </W>
  );
}
