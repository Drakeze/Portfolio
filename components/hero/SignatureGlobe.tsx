"use client"

import { useEffect, useRef } from "react"
import { geoGraticule, geoOrthographic, geoPath } from "d3-geo"

import type { Signature } from "@/lib/types/signature"

export type SignatureGlobeProps = {
  signatures: Signature[]
}

type GlobeColors = {
  faceOuter:       string
  faceMid1:        string
  faceMid2:        string
  faceInner:       string
  limb:            string
  grid:            string
  dotFill:         (f: number) => string
  dotFillFeatured: string
  dotHover:        string
  shadowFill:      string
  tagBg:           string
  tagBorder:       string
  tagDot:          string
  gradOriginFactor: { x: number; y: number }
}

function resolveGlobeColors(): GlobeColors {
  const isDark = document.documentElement.classList.contains("dark")
  return isDark
    ? {
        faceOuter:       "rgba(68,29,76,1)",
        faceMid1:        "rgba(56,24,64,0.9)",
        faceMid2:        "rgba(44,19,49,0.6)",
        faceInner:       "rgba(30,10,40,0.2)",
        limb:            "rgba(200,160,220,0.42)",
        grid:            "rgba(160,140,180,0.72)",
        dotFill:         (f) => `rgba(180,120,210,${(0.12 + f * 0.68).toFixed(3)})`,
        dotFillFeatured: "rgba(180,120,210,0.95)",
        dotHover:        "rgba(200,150,230,1)",
        shadowFill:      "rgba(40,20,50,0.30)",
        tagBg:           "#2c1331",
        tagBorder:       "rgba(200,160,220,0.2)",
        tagDot:          "#b478d2",
        gradOriginFactor: { x: -0.245, y: -0.327 },
      }
    : {
        faceOuter:       "rgba(217,185,229,1)",
        faceMid1:        "rgba(234,216,239,1)",
        faceMid2:        "rgba(247,239,249,1)",
        faceInner:       "rgba(255,255,255,1)",
        limb:            "rgba(23,21,26,0.85)",
        grid:            "rgba(201,196,204,0.72)",
        dotFill:         (f) => `rgba(110,70,150,${(0.12 + f * 0.68).toFixed(3)})`,
        dotFillFeatured: "rgba(139,63,180,1)",
        dotHover:        "rgba(139,63,180,1)",
        shadowFill:      "rgba(185,167,192,0.22)",
        tagBg:           "#fff",
        tagBorder:       "#e6e6e6",
        tagDot:          "#8b3fb4",
        gradOriginFactor: { x: -0.245, y: -0.327 },
      }
}

const TILT      = -12
const ROLL      = -24
const ROT_SPEED =   2   // °/s

const GRATICULE = geoGraticule().step([20, 20])()

export function SignatureGlobe({ signatures }: SignatureGlobeProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const tagTextRef   = useRef<HTMLSpanElement>(null)
  const tagDotRef    = useRef<HTMLSpanElement>(null)
  const hoverTagRef  = useRef<HTMLDivElement>(null)
  const hoverTextRef = useRef<HTMLSpanElement>(null)

  const stateRef = useRef({
    lon:          -34,
    lastTs:       0,
    frameId:      0,
    w:            0,
    h:            0,
    dpr:          1,
    colors:       null as GlobeColors | null,
    featuredIdx:  0,
    featuredTimer: 0,
    visible:      true,
    docVisible:   true,
    running:      false,
    hoverSig:     null as Signature | null,
  })

  useEffect(() => {
    const canvas   = canvasRef.current
    const tag      = tagRef.current
    const tagText  = tagTextRef.current
    const tagDot   = tagDotRef.current
    const hoverTag = hoverTagRef.current
    const hoverTxt = hoverTextRef.current
    if (!canvas || !tag || !tagText || !tagDot || !hoverTag || !hoverTxt) return

    const state  = stateRef.current
    state.colors = resolveGlobeColors()

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const hero = canvas.parentElement!
    let tagW   = 0

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      state.w   = width
      state.h   = height
      state.dpr = Math.min(devicePixelRatio, 2)
      canvas.width  = Math.round(width  * state.dpr)
      canvas.height = Math.round(height * state.dpr)
      const ctx = canvas.getContext("2d")!
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
      tagW = tag.offsetWidth || 120
      if (!state.running) drawFrame(0)
    })
    ro.observe(hero)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onThemeChange = () => { state.colors = resolveGlobeColors() }
    mq.addEventListener("change", onThemeChange)
    const mo = new MutationObserver(onThemeChange)
    mo.observe(document.documentElement, { attributeFilter: ["class"] })

    const io = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting
        if (state.visible && state.docVisible && !state.running && !reduced) startLoop()
        if (!state.visible) stopLoop()
      },
      { threshold: 0.01 },
    )
    io.observe(canvas)

    const onVisChange = () => {
      state.docVisible = !document.hidden
      if (state.docVisible && state.visible && !state.running && !reduced) startLoop()
      if (!state.docVisible) stopLoop()
    }
    document.addEventListener("visibilitychange", onVisChange)

    const sigs = signatures.length > 150 ? signatures.slice(0, 150) : signatures

    function computeGeometry() {
      const { w, h } = state
      const PAD     = 24
      const rWanted = w * 0.253
      const rMax    = h / 2 - PAD
      const r       = Math.min(rWanted, rMax)
      const cx      = w * 0.80
      const cy      = h / 2
      return { cx, cy, r }
    }

    function makeProj(cx: number, cy: number, r: number) {
      return geoOrthographic()
        .translate([cx, cy])
        .scale(r)
        .rotate([state.lon, TILT, ROLL])
        .clipAngle(90)
    }

    // Hit-test the current globe for a canvas pixel position
    function dotAt(mx: number, my: number): { sig: Signature; pt: [number, number] } | null {
      const { cx, cy, r } = computeGeometry()
      const proj = makeProj(cx, cy, r)
      let closest: { sig: Signature; pt: [number, number] } | null = null
      let minD = 14
      for (const sig of sigs) {
        const pt = proj([sig.lon, sig.lat])
        if (!pt) continue
        const dist = Math.sqrt((pt[0] - cx) ** 2 + (pt[1] - cy) ** 2) / r
        if (1 - dist < 0.12) continue
        const d = Math.sqrt((mx - pt[0]) ** 2 + (my - pt[1]) ** 2)
        if (d < minD) { minD = d; closest = { sig, pt: pt as [number, number] } }
      }
      return closest
    }

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      const hit  = dotAt(mx, my)
      state.hoverSig = hit ? hit.sig : null
      if (hit && hoverTag && hoverTxt) {
        const label = hit.sig.location
          ? `${hit.sig.name} — ${hit.sig.location}`
          : hit.sig.name
        hoverTxt.textContent = label
        const tx = Math.min(hit.pt[0] + 14, (state.w || 800) - 160)
        const ty = hit.pt[1] - 16
        hoverTag.style.transform = `translate(${tx}px, ${ty}px)`
        hoverTag.style.opacity   = "1"
      } else if (hoverTag) {
        hoverTag.style.opacity = "0"
      }
      canvas.style.cursor = hit ? "default" : ""
    }

    const onMouseLeave = () => {
      state.hoverSig = null
      if (hoverTag) hoverTag.style.opacity = "0"
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    function drawFrame(_ts: number) {
      const canvas2 = canvasRef.current
      if (!canvas2) return
      const ctx = canvas2.getContext("2d")
      if (!ctx) return

      const { w, h, lon, colors } = state
      if (!colors || w === 0 || h === 0) return

      const { cx, cy, r } = computeGeometry()
      const proj   = makeProj(cx, cy, r)
      const pathFn = geoPath(proj, ctx)

      ctx.clearRect(0, 0, w, h)

      // 0. Drop shadow
      ctx.save()
      ctx.filter = `blur(${Math.round(r * 0.035)}px)`
      ctx.beginPath()
      ctx.ellipse(cx, cy + r * 0.83, r * 0.758, r * 0.082, 0, 0, Math.PI * 2)
      ctx.fillStyle = colors.shadowFill
      ctx.fill()
      ctx.restore()

      // 1. Radial gradient fill
      // Gradient outer radius is 1.47× globe radius — same ratio as mockup SVG (504px / 343px).
      // This keeps the globe mostly purple; white is only reached at the far outer edge.
      const { x: ox, y: oy } = colors.gradOriginFactor
      const gx   = cx + r * ox
      const gy   = cy + r * oy
      const grad = ctx.createRadialGradient(gx, gy, r * 0.05, cx, cy, r * 1.47)
      grad.addColorStop(0,    colors.faceOuter)
      grad.addColorStop(0.42, colors.faceMid1)
      grad.addColorStop(0.76, colors.faceMid2)
      grad.addColorStop(1,    colors.faceInner)
      ctx.beginPath()
      pathFn({ type: "Sphere" })
      ctx.fillStyle = grad
      ctx.fill()

      // 2. Limb stroke
      ctx.beginPath()
      pathFn({ type: "Sphere" })
      ctx.strokeStyle = colors.limb
      ctx.lineWidth   = 1.5
      ctx.stroke()

      // 3. Graticule
      ctx.beginPath()
      pathFn(GRATICULE)
      ctx.strokeStyle = colors.grid
      ctx.lineWidth   = 1
      ctx.stroke()

      // 4 & 5. Signature dots
      let featuredPt  = null as [number, number] | null
      let featuredSig = null as Signature | null

      for (let i = 0; i < sigs.length; i++) {
        const sig = sigs[i]
        if (state.hoverSig === sig) continue  // draw hovered last
        const pt = proj([sig.lon, sig.lat])
        if (!pt) continue

        const dist = Math.sqrt((pt[0] - cx) ** 2 + (pt[1] - cy) ** 2) / r
        const f    = 1 - dist
        if (f < 0.12) continue

        if (i === state.featuredIdx) {
          featuredPt  = pt as [number, number]
          featuredSig = sig
          continue
        }

        ctx.beginPath()
        ctx.arc(pt[0], pt[1], 1.1 + f * 1.9, 0, Math.PI * 2)
        ctx.fillStyle = colors.dotFill(f)
        ctx.fill()
      }

      // Featured cycling dot
      if (featuredPt) {
        const dist = Math.sqrt((featuredPt[0] - cx) ** 2 + (featuredPt[1] - cy) ** 2) / r
        if (1 - dist >= 0.12) {
          ctx.beginPath()
          ctx.arc(featuredPt[0], featuredPt[1], 4, 0, Math.PI * 2)
          ctx.fillStyle = colors.dotFillFeatured
          ctx.fill()
        }
      }

      // Hovered dot — on top, with ring
      if (state.hoverSig) {
        const hpt = proj([state.hoverSig.lon, state.hoverSig.lat])
        if (hpt) {
          ctx.beginPath()
          ctx.arc(hpt[0], hpt[1], 5, 0, Math.PI * 2)
          ctx.fillStyle = colors.dotHover
          ctx.fill()
          ctx.beginPath()
          ctx.arc(hpt[0], hpt[1], 9, 0, Math.PI * 2)
          ctx.strokeStyle = colors.dotHover.replace(",1)", ",0.3)")
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      // 6. Cycling name tag (suppress when hovering another dot)
      const showCycling = !state.hoverSig || state.hoverSig === featuredSig
      if (tag && tagText && tagDot && featuredPt && featuredSig && showCycling) {
        const dist    = Math.sqrt((featuredPt[0] - cx) ** 2 + (featuredPt[1] - cy) ** 2) / r
        const f       = 1 - dist
        const opacity = f < 0.55 ? 0 : Math.min((f - 0.55) / 0.2, 1)
        tagText.textContent = featuredSig.location
          ? `${featuredSig.name} — ${featuredSig.location}`
          : featuredSig.name
        const tx = Math.min(featuredPt[0] + 14, (w || 800) - (tagW || 120) - 8)
        const ty = featuredPt[1] - 16
        tag.style.transform       = `translate(${tx}px, ${ty}px)`
        tag.style.opacity         = String(opacity)
        tag.style.background      = colors.tagBg
        tag.style.borderColor     = colors.tagBorder
        tagDot.style.backgroundColor = colors.tagDot
      } else if (tag && !showCycling) {
        tag.style.opacity = "0"
      } else if (tag) {
        tag.style.opacity = "0"
      }
    }

    function tick(ts: number) {
      const s  = stateRef.current
      const dt = Math.min(ts - (s.lastTs || ts), 50) / 1000
      s.lastTs  = ts
      s.lon    += dt * ROT_SPEED
      s.featuredTimer += dt

      if (s.featuredTimer > 8) {
        s.featuredTimer = 0
        for (let tries = 0; tries < sigs.length; tries++) {
          const next = (s.featuredIdx + 1 + tries) % sigs.length
          const pt = geoOrthographic()
            .translate([0, 0])
            .scale(1)
            .rotate([s.lon, TILT, ROLL])
            .clipAngle(90)([sigs[next].lon, sigs[next].lat])
          if (pt) {
            const dist = Math.sqrt(pt[0] ** 2 + pt[1] ** 2)
            if (dist < 0.88) { s.featuredIdx = next; break }
          }
        }
      }

      drawFrame(ts)
      s.frameId = requestAnimationFrame(tick)
    }

    function startLoop() {
      if (state.running) return
      state.running = true
      state.frameId = requestAnimationFrame(tick)
    }

    function stopLoop() {
      state.running = false
      cancelAnimationFrame(state.frameId)
    }

    tagW = tag.offsetWidth || 120
    if (!reduced) startLoop()

    return () => {
      stopLoop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      mq.removeEventListener("change", onThemeChange)
      document.removeEventListener("visibilitychange", onVisChange)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tagStyle: React.CSSProperties = {
    zIndex: 1,
    left: 0,
    top: 0,
    opacity: 0,
    whiteSpace: "nowrap",
    borderRadius: "999px",
    padding: "6px 13px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    boxShadow: "0 3px 14px rgba(0,0,0,.07)",
    border: "1px solid",
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Cycling featured name tag */}
      <div ref={tagRef} aria-hidden="true" className="absolute pointer-events-none" style={tagStyle}>
        <span ref={tagDotRef} className="inline-block rounded-full align-middle" style={{ width: 5, height: 5, marginRight: 6 }} />
        <span ref={tagTextRef} />
      </div>

      {/* Hover tooltip */}
      <div ref={hoverTagRef} aria-hidden="true" className="absolute pointer-events-none" style={{ ...tagStyle, background: "#fff", borderColor: "#e6e6e6" }}>
        <span className="inline-block rounded-full align-middle" style={{ width: 5, height: 5, marginRight: 6, backgroundColor: "#8b3fb4" }} />
        <span ref={hoverTextRef} />
      </div>

      <ul className="sr-only">
        {signatures.map((sig) => (
          <li key={sig.id}>{sig.location ? `${sig.name} — ${sig.location}` : sig.name}</li>
        ))}
      </ul>
    </>
  )
}
