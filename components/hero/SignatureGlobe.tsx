"use client"

import { geoGraticule, geoOrthographic, geoPath } from "d3-geo"
import { useEffect, useRef } from "react"

import type { Signature } from "@/lib/types/signature"

import { HERO_PEEK } from "./constants"

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
  dotHover:        string
  shadowFill:      string
  labelFont:       string
  labelText:       string
  labelHalo:       string
  gradOriginFactor: { x: number; y: number }
}

/**
 * Canvas cannot use CSS classes, so label colours and the font come from
 * computed style. Read off the canvas element specifically: the --font-* vars
 * live on <body> while the semantic tokens live on :root, and the canvas
 * inherits both.
 */
function resolveGlobeColors(el: Element): GlobeColors {
  const isDark = document.documentElement.classList.contains("dark")
  const css    = getComputedStyle(el)
  const mono   = css.getPropertyValue("--font-jetbrains-mono").trim()
  const label  = {
    labelFont: `11px ${mono ? `${mono}, ` : ""}ui-monospace, monospace`,
    labelText: css.getPropertyValue("--text-primary").trim() || "#0E0E10",
    labelHalo: css.getPropertyValue("--surface-page").trim() || "#FFFFFF",
  }

  return isDark
    ? {
        ...label,
        faceOuter:       "rgba(68,29,76,1)",
        faceMid1:        "rgba(56,24,64,0.9)",
        faceMid2:        "rgba(44,19,49,0.6)",
        faceInner:       "rgba(30,10,40,0.2)",
        limb:            "rgba(200,160,220,0.42)",
        grid:            "rgba(160,140,180,0.72)",
        dotFill:         (f) => `rgba(180,120,210,${(0.12 + f * 0.68).toFixed(3)})`,
        dotHover:        "rgba(200,150,230,1)",
        shadowFill:      "rgba(40,20,50,0.30)",
        gradOriginFactor: { x: -0.245, y: -0.327 },
      }
    : {
        ...label,
        faceOuter:       "rgba(217,185,229,1)",
        faceMid1:        "rgba(234,216,239,1)",
        faceMid2:        "rgba(247,239,249,1)",
        faceInner:       "rgba(255,255,255,1)",
        limb:            "rgba(23,21,26,0.85)",
        grid:            "rgba(201,196,204,0.72)",
        dotFill:         (f) => `rgba(110,70,150,${(0.12 + f * 0.68).toFixed(3)})`,
        dotHover:        "rgba(139,63,180,1)",
        shadowFill:      "rgba(185,167,192,0.22)",
        gradOriginFactor: { x: -0.245, y: -0.327 },
      }
}

const TILT      = -12
const ROLL      = -24
const ROT_SPEED =   8   // °/s - one revolution every 45s. 6-10 is the usable band;
                        // above ~12 the labels smear.

const GRATICULE = geoGraticule().step([20, 20])()

export function SignatureGlobe({ signatures }: SignatureGlobeProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
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
    visible:      true,
    docVisible:   true,
    running:      false,
    hoverSig:     null as Signature | null,
  })

  useEffect(() => {
    const canvas   = canvasRef.current
    const hoverTag = hoverTagRef.current
    const hoverTxt = hoverTextRef.current
    if (!canvas || !hoverTag || !hoverTxt) return

    const state  = stateRef.current
    state.colors = resolveGlobeColors(canvas)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const hero = canvas.parentElement!

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
      if (!state.running) drawFrame(0)
    })
    ro.observe(hero)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onThemeChange = () => {
      state.colors = resolveGlobeColors(canvas)
      // The loop is the only other thing that paints, and it is stopped
      // under reduced motion or when the hero is out of view.
      if (!state.running) drawFrame(0)
    }
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

    // Capped for frame budget. The sr-only list below renders all of them.
    const sigs = signatures.length > 150 ? signatures.slice(0, 150) : signatures

    // Label slot bookkeeping: which fixed slot each visible signature holds.
    const LABEL_SLOTS = 12
    const slots       = new Map<Signature, number>()
    const slotUsed: boolean[] = Array(LABEL_SLOTS).fill(false)

    function computeGeometry() {
      const { w, h } = state
      const PAD     = 24
      // The hero is HERO_PEEK shorter than the viewport so the band below
      // shows. Size from the height it would have had, so the globe keeps its
      // full-height radius and centre and is simply cropped at the bottom by
      // the hero's overflow-hidden.
      const hFull   = h + HERO_PEEK
      const rWanted = w * 0.253
      const rMax    = hFull / 2 - PAD
      const r       = Math.min(rWanted, rMax)
      const cx      = w * 0.80
      const cy      = hFull / 2
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
        hoverTxt.textContent = `${hit.sig.name} · ${hit.sig.location}`
        const tx = Math.min(hit.pt[0] + 14, (state.w || 800) - 160)
        const ty = hit.pt[1] - 16
        hoverTag.style.transform = `translate(${tx}px, ${ty}px)`
        hoverTag.style.opacity   = "1"
      } else if (hoverTag) {
        hoverTag.style.opacity = "0"
      }
      canvas.style.cursor = hit ? "pointer" : ""
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

      const { w, h, colors } = state
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
      const labels: { sig: Signature; x: number; y: number; f: number }[] = []

      for (const sig of sigs) {
        const pt = proj([sig.lon, sig.lat])
        if (!pt) continue

        const dist = Math.sqrt((pt[0] - cx) ** 2 + (pt[1] - cy) ** 2) / r
        const f    = 1 - dist
        if (f < 0.12) continue

        labels.push({ sig, x: pt[0], y: pt[1], f })

        if (state.hoverSig === sig) continue  // drawn last, on top

        ctx.beginPath()
        ctx.arc(pt[0], pt[1], 1.1 + f * 1.9, 0, Math.PI * 2)
        ctx.fillStyle = colors.dotFill(f)
        ctx.fill()
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

      // 6. Labels sit in fixed screen slots; only the leader line to the dot
      // moves. A label keeps its slot from the moment its dot comes into view
      // until the dot fades at the limb, so the text never travels with the
      // rotation. Slots form a column on the globe's left face, clear of the
      // hero copy.
      ctx.save()
      ctx.font         = colors.labelFont
      ctx.textBaseline = "middle"
      ctx.textAlign    = "left"
      ctx.lineJoin     = "round"
      ctx.miterLimit   = 2

      const slotX = cx - r * 0.62
      const slotY = (i: number) => cy + (i - (LABEL_SLOTS - 1) / 2) * ((r * 1.5) / (LABEL_SLOTS - 1))

      // Floor sits above the dot cull threshold (0.12), so a label always
      // reaches zero alpha before its dot vanishes at the limb.
      const alphaOf = (f: number) => Math.min((f - 0.18) / 0.22, 1)

      // Free the slots of dots that left view, then give each newly visible
      // dot (front-most first) the free slot nearest its own height.
      const visible = new Set<Signature>()
      for (const l of labels) if (alphaOf(l.f) > 0) visible.add(l.sig)
      for (const [sig, i] of slots) {
        if (!visible.has(sig)) { slots.delete(sig); slotUsed[i] = false }
      }

      labels.sort((a, b) => b.f - a.f)
      for (const l of labels) {
        if (slots.has(l.sig) || alphaOf(l.f) <= 0) continue
        let best = -1
        for (let i = 0; i < LABEL_SLOTS; i++) {
          if (slotUsed[i]) continue
          if (best < 0 || Math.abs(slotY(i) - l.y) < Math.abs(slotY(best) - l.y)) best = i
        }
        if (best < 0) break
        slots.set(l.sig, best)
        slotUsed[best] = true
      }

      for (const l of labels) {
        const i = slots.get(l.sig)
        if (i === undefined || l.sig === state.hoverSig) continue  // the DOM tooltip shows the hovered one

        const alpha = alphaOf(l.f)
        const y     = slotY(i)

        ctx.globalAlpha = alpha * 0.35
        ctx.strokeStyle = colors.labelText
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(slotX - 6, y)
        ctx.lineTo(l.x, l.y)
        ctx.stroke()

        const text = `${l.sig.name} · ${l.sig.location}`
        ctx.globalAlpha = alpha * 0.9  // stays subordinate to the headline
        ctx.lineWidth   = 3
        ctx.strokeStyle = colors.labelHalo
        ctx.fillStyle   = colors.labelText
        ctx.strokeText(text, slotX, y)
        ctx.fillText(text, slotX, y)
      }
      ctx.restore()
    }

    function tick(ts: number) {
      const s  = stateRef.current
      const dt = Math.min(ts - (s.lastTs || ts), 50) / 1000
      s.lastTs = ts
      s.lon   += dt * ROT_SPEED
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
    // signatures is a dependency: it used to be a module-level fixture, so an
    // empty array was harmless, but it is real data now and the canvas would
    // otherwise keep drawing whatever arrived on first render.
  }, [signatures])

  const tagStyle: React.CSSProperties = {
    zIndex: 1,
    left: 0,
    top: 0,
    opacity: 0,
    whiteSpace: "nowrap",
    borderRadius: "999px",
    padding: "6px 12px",
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
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

      {/* Hover tooltip */}
      <div ref={hoverTagRef} aria-hidden="true" className="absolute pointer-events-none" style={{ ...tagStyle, background: "var(--card)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}>
        <span className="inline-block rounded-full align-middle" style={{ width: 7, height: 7, marginRight: 8, backgroundColor: "var(--dot-architecture)" }} />
        <span ref={hoverTextRef} />
      </div>

      <ul className="sr-only">
        {signatures.map((sig) => (
          <li key={sig.id}>{`${sig.name} · ${sig.location}`}</li>
        ))}
      </ul>
    </>
  )
}
