'use client';

/**
 * SorenLabBanner.jsx
 * Animated portfolio card banner for SorenLab
 *
 * Usage in your Next.js portfolio:
 *   import SorenLabBanner from '@/components/banners/SorenLabBanner';
 *   <SorenLabBanner />
 *
 * Props:
 *   onClick  — optional click handler
 *   href     — optional link URL
 */

import { useEffect, useRef, useState } from 'react';

const TAGLINES = [
  'Architecting the modern web',
  'APIs that connect the world',
  'Blueprint to deployment',
  'Engineering elegant solutions',
];

// Node positions: [x, y, label]
// CORE (index 5) is the central hub
const NODES = [
  [45, 12, 'API'],
  [78, 32, 'WEB'],
  [75, 68, 'UI' ],
  [15, 68, 'DB' ],
  [12, 32, 'OPS'],
  [45, 48, 'CORE'], // hub — index 5
];

// Which nodes are connected
const EDGES = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], // all connect to CORE
  [0, 1], [2, 3],                           // cross connections
];

export default function SorenLabBanner({ onClick, href, bare }) {
  const svgRef        = useRef(null);
  const [taglineIdx,  setTaglineIdx]  = useState(0);
  const [taglineFade, setTaglineFade] = useState(true);

  // Build SVG nodes and animated edges after mount
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';

    // Clear dynamic content but preserve the <style> element
    Array.from(svg.children)
      .filter(el => el.tagName.toLowerCase() !== 'style')
      .forEach(el => svg.removeChild(el));

    // Edges (drawn first so they sit behind nodes)
    EDGES.forEach(([a, b], i) => {
      const [x1, y1] = NODES[a];
      const [x2, y2] = NODES[b];
      const len      = Math.hypot(x2 - x1, y2 - y1);

      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('class', 'sl-edge');
      line.setAttribute('stroke-dasharray', len);
      line.setAttribute('stroke-dashoffset', len);

      // Animate the line drawing in
      const anim = document.createElementNS(NS, 'animate');
      anim.setAttribute('attributeName', 'stroke-dashoffset');
      anim.setAttribute('from', len);
      anim.setAttribute('to',   0);
      anim.setAttribute('dur',  `${0.5 + i * 0.1}s`);
      anim.setAttribute('begin', `${i * 0.08}s`);
      anim.setAttribute('fill', 'freeze');
      line.appendChild(anim);

      svg.appendChild(line);
    });

    // Nodes
    NODES.forEach(([x, y, label], i) => {
      const isHub = i === 5;
      const g     = document.createElementNS(NS, 'g');

      // Main circle
      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r',  isHub ? 9 : 6);
      circle.setAttribute('class', isHub ? 'sl-hub' : 'sl-node');
      g.appendChild(circle);

      // Pulsing center dot
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r',  isHub ? 2.5 : 1.5);
      dot.setAttribute('class', 'sl-dot');

      const pulse = document.createElementNS(NS, 'animate');
      pulse.setAttribute('attributeName', 'opacity');
      pulse.setAttribute('values', '1;0.25;1');
      pulse.setAttribute('dur', `${1.4 + i * 0.25}s`);
      pulse.setAttribute('repeatCount', 'indefinite');
      dot.appendChild(pulse);
      g.appendChild(dot);

      // Label
      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', isHub ? y + 19 : (y < 45 ? y - 9 : y + 15));
      text.setAttribute('class', 'sl-label');
      text.textContent = label;
      g.appendChild(text);

      svg.appendChild(g);
    });
  }, []);

  // Tagline cycling
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineFade(false);
      setTimeout(() => {
        setTaglineIdx(i => (i + 1) % TAGLINES.length);
        setTaglineFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const Wrapper      = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      onClick={onClick}
      style={bare ? {
        display:        'flex',
        alignItems:     'center',
        gap:            '16px',
        padding:        '1.25rem',
        overflow:       'hidden',
        position:       'relative',
        width:          '100%',
        cursor:         'pointer',
        textDecoration: 'none',
      } : {
        display:        'flex',
        alignItems:     'center',
        gap:            '16px',
        padding:        '1.25rem',
        background:     'var(--color-background-primary, #fff)',
        border:         '0.5px solid var(--color-border-tertiary, #e5e7eb)',
        borderLeft:     '3px solid #185FA5',
        borderRadius:   '12px',
        overflow:       'hidden',
        position:       'relative',
        cursor:         'pointer',
        textDecoration: 'none',
        transition:     'border-left-color 0.2s ease',
      }}
      onMouseEnter={bare ? undefined : e => (e.currentTarget.style.borderLeftColor = '#3b82f6')}
      onMouseLeave={bare ? undefined : e => (e.currentTarget.style.borderLeftColor = '#185FA5')}
    >
      {/* Blueprint grid background */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <pattern id="sorenGrid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M 18 0 L 0 0 0 18" fill="none" stroke="var(--color-border-tertiary, #e5e7eb)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sorenGrid)" />
      </svg>

      {/* Node diagram */}
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <svg
          ref={svgRef}
          width="90"
          height="90"
          viewBox="-10 -10 110 110"
          aria-label="Service connection diagram"
        >
          <style>{`
            .sl-edge  { stroke: var(--color-border-info, #93c5fd); stroke-width: .8; stroke-opacity: .65; }
            .sl-node  { fill: var(--color-background-info, #eff6ff); stroke: var(--color-border-info, #93c5fd); stroke-width: 1; }
            .sl-hub   { fill: var(--color-background-info, #eff6ff); stroke: var(--color-text-info, #1e40af); stroke-width: 1.5; }
            .sl-dot   { fill: var(--color-text-info, #1e40af); }
            .sl-label { fill: var(--color-text-info, #1e40af); font-family: monospace; font-size: 6px; letter-spacing: .5px; text-anchor: middle; }
          `}</style>
        </svg>
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '19px', fontWeight: 500, lineHeight: 1, marginBottom: '4px', letterSpacing: '2px', fontFamily: 'monospace', color: 'var(--color-text-primary, #111)' }}>
          SOREN<span style={{ color: '#185FA5' }}>LAB</span>
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#185FA5', fontFamily: 'monospace', marginBottom: '10px' }}>
          Digital Solutions
        </div>
        <div style={{
          fontSize:   '12px',
          fontFamily: 'monospace',
          color:      'var(--color-text-secondary, #666)',
          lineHeight: 1.4,
          opacity:    taglineFade ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          {TAGLINES[taglineIdx]}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
          <div style={{
            width:        '6px',
            height:       '6px',
            borderRadius: '50%',
            background:   '#185FA5',
            flexShrink:   0,
            animation:    'sorenPulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#185FA5', fontFamily: 'monospace' }}>
            Systems Online
          </span>
        </div>
      </div>

      <style>{`
        @keyframes sorenPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .25; transform: scale(1.6); }
        }
      `}</style>
    </Wrapper>
  );
}
