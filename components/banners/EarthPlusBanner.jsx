'use client';

/**
 * EarthPlusBanner.jsx
 * Animated portfolio card banner for Earth+
 *
 * Usage in your Next.js portfolio:
 *   import EarthPlusBanner from '@/components/banners/EarthPlusBanner';
 *   <EarthPlusBanner />
 *
 * Props:
 *   onClick  — optional click handler (e.g. router.push('/earth-plus'))
 *   href     — optional link URL
 */

import { useEffect, useRef, useState } from 'react';

const TAGLINES = [
  'Empowering communities worldwide',
  'Building a sustainable future',
  'Technology for social impact',
  'Open source · Open heart',
];

// 10x10 pixel globe map — 1 = ocean, 2 = land, 0 = outside globe
const WORLD_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 2, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 2, 2, 1, 1, 2, 1, 0],
  [1, 1, 2, 2, 1, 1, 2, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 2, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const PARTICLES = [
  { left: 18, top: 28 }, { left: 35, top: 58 }, { left: 52, top: 38 },
  { left: 67, top: 68 }, { left: 76, top: 32 }, { left: 24, top: 72 },
  { left: 44, top: 26 }, { left: 82, top: 52 },
];

const GRID = 10;
const PX   = 8;   // canvas pixels per cell
const CX   = 5;   // circle center x (cell units)
const CY   = 5;   // circle center y (cell units)
const R    = 4;   // circle radius (cell units)

// Precompute which cells are inside the circular globe
const IN_CIRCLE = Array.from({ length: GRID }, (_, r) =>
  Array.from({ length: GRID }, (_, c) => {
    const dx = c + 0.5 - CX;
    const dy = r + 0.5 - CY;
    return dx * dx + dy * dy <= R * R;
  })
);

export default function EarthPlusBanner({ onClick, href, bare }) {
  const canvasRef  = useRef(null);
  const noiseRef   = useRef(null);
  const rafRef     = useRef(null);
  const lastTRef   = useRef(0);

  const [taglineIdx, setTaglineIdx]  = useState(0);
  const [taglineFade, setTaglineFade] = useState(true);

  // Build per-cell noise once on mount
  useEffect(() => {
    noiseRef.current = Array.from({ length: GRID }, () =>
      Array.from({ length: GRID }, () => 0.85 + Math.random() * 0.15)
    );
  }, []);

  // Globe animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function drawGlobe(t) {
      const noise = noiseRef.current;
      if (!noise) return;

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, GRID * PX, GRID * PX);
      const offset = Math.floor(((t * 0.000028) % 1) * GRID);

      for (let row = 0; row < GRID; row++) {
        for (let col = 0; col < GRID; col++) {
          if (!IN_CIRCLE[row][col]) continue;

          const mapCol = (col + offset) % GRID;
          const cell   = WORLD_MAP[row][mapCol] || 1;
          const n      = noise[row][col];

          ctx.fillStyle = isDark
            ? cell === 2
              ? `rgb(${(50 * n) | 0}, ${(195 * n) | 0}, ${(85 * n) | 0})`    // land — brighter for dark
              : `rgb(${(35 * n) | 0}, ${(140 * n) | 0}, ${(225 * n) | 0})`   // ocean — brighter for dark
            : cell === 2
              ? `rgb(${(28 * n) | 0}, ${(148 * n) | 0}, ${(55 * n) | 0})`    // land
              : `rgb(${(18 * n) | 0}, ${(100 * n) | 0}, ${(185 * n) | 0})`;  // ocean
          ctx.fillRect(col * PX, row * PX, PX - 1, PX - 1);
        }
      }

      // Atmosphere rim
      ctx.beginPath();
      ctx.arc(CX * PX, CY * PX, R * PX, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(50, 210, 130, 0.55)' : 'rgba(29, 158, 117, 0.45)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }

    function loop(t) {
      if (t - lastTRef.current > 120) {
        drawGlobe(t);
        lastTRef.current = t;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Tagline cycling
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineFade(false);
      setTimeout(() => {
        setTaglineIdx(i => (i + 1) % TAGLINES.length);
        setTaglineFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      onClick={onClick}
      style={bare ? {
        display:         'flex',
        alignItems:      'center',
        gap:             '16px',
        padding:         '1.25rem',
        overflow:        'hidden',
        position:        'relative',
        width:           '100%',
        cursor:          'pointer',
        textDecoration:  'none',
      } : {
        display:         'flex',
        alignItems:      'center',
        gap:             '16px',
        padding:         '1.25rem',
        background:      'var(--color-background-primary, #fff)',
        border:          '0.5px solid var(--color-border-tertiary, #e5e7eb)',
        borderLeft:      '3px solid #1D9E75',
        borderRadius:    '12px',
        overflow:        'hidden',
        position:        'relative',
        cursor:          'pointer',
        textDecoration:  'none',
        transition:      'border-left-color 0.2s ease',
      }}
      onMouseEnter={bare ? undefined : e => (e.currentTarget.style.borderLeftColor = '#22c55e')}
      onMouseLeave={bare ? undefined : e => (e.currentTarget.style.borderLeftColor = '#1D9E75')}
    >
      {/* Floating particles */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        {PARTICLES.map(({ left, top }, i) => (
          <div
            key={i}
            style={{
              position:        'absolute',
              width:           '3px',
              height:          '3px',
              borderRadius:    '50%',
              background:      'rgba(29, 158, 117, 0.3)',
              left:            `${left}%`,
              top:             `${top}%`,
              opacity:         0,
              animation:       `earthFloat ${3 + i * 0.5}s ${i * 0.6}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Globe canvas */}
      <canvas
        ref={canvasRef}
        width={GRID * PX}
        height={GRID * PX}
        aria-label="Rotating pixel globe"
        style={{ imageRendering: 'pixelated', flexShrink: 0 }}
      />

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1, marginBottom: '4px', letterSpacing: '-0.5px', color: 'var(--color-text-primary, #111)' }}>
          EARTH<span style={{ color: '#1D9E75' }}>+</span>
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1D9E75', fontFamily: 'monospace', marginBottom: '10px' }}>
          Nonprofit · Initiative
        </div>
        <div style={{
          fontSize:    '13px',
          color:       'var(--color-text-secondary, #666)',
          fontStyle:   'italic',
          lineHeight:  1.4,
          opacity:     taglineFade ? 1 : 0,
          transition:  'opacity 0.4s ease',
        }}>
          {TAGLINES[taglineIdx]}
        </div>
      </div>

      <style>{`
        @keyframes earthFloat {
          0%   { transform: translateY(0);     opacity: 0; }
          20%  { opacity: 0.35; }
          80%  { opacity: 0.12; }
          100% { transform: translateY(-55px); opacity: 0; }
        }
      `}</style>
    </Wrapper>
  );
}
