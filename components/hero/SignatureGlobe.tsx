"use client"

import { geoGraticule, geoOrthographic, geoPath } from "d3-geo"
import { useEffect, useRef } from "react"

import { permanentSlots } from "@/lib/globe/label-slots"
import type { Signature } from "@/lib/types/signature"

import { HERO_PEEK, MOBILE_BREAKPOINT, MOBILE_GLOBE_H } from "./constants"

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
  dotCore:         (f: number) => string
  dotHalo:         (f: number) => string
  dotRing:         (f: number) => string
  /** Thin outline round the core; only needed where the core sits on a pale face. */
  dotEdge:         string | null
  dotHover:        string
  shadowFill:      string
  /** Outer glow (dark only): purple fading to nothing between r and 1.18r. */
  glow:            { inner: string; outer: string } | null
  /** Inner rim light (dark only): transparent at 0.78r up to this colour at the limb. */
  rim:             string | null
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
        // Midnight: a near-black indigo sphere that reads against the page by its
        // glowing violet rim, with a faint grid, instead of a flat purple disc.
        faceOuter:       "rgba(52,34,92,1)",
        faceMid1:        "rgba(24,16,52,1)",
        faceMid2:        "rgba(10,7,26,1)",
        faceInner:       "rgba(6,4,16,1)",
        limb:            "rgba(176,120,230,0.85)",
        grid:            "rgba(150,110,220,0.28)",
        dotCore:         () => "rgba(255,246,255,1)",
        dotHalo:         (f) => `rgba(190,130,255,${(0.1 + f * 0.28).toFixed(3)})`,
        dotRing:         (f) => `rgba(225,185,255,${(0.2 + f * 0.6).toFixed(3)})`,
        dotEdge:         null,
        dotHover:        "rgba(255,240,255,1)",
        shadowFill:      "rgba(0,0,0,0.25)",
        glow:            { inner: "rgba(136,58,152,0.35)", outer: "rgba(136,58,152,0)" },
        rim:             "rgba(136,58,152,0.35)",
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
        dotCore:         () => "rgba(88,36,140,1)",
        dotHalo:         (f) => `rgba(110,70,150,${(0.1 + f * 0.2).toFixed(3)})`,
        dotRing:         (f) => `rgba(110,70,150,${(0.2 + f * 0.5).toFixed(3)})`,
        dotEdge:         "rgba(255,255,255,0.95)",
        dotHover:        "rgba(139,63,180,1)",
        shadowFill:      "rgba(185,167,192,0.22)",
        glow:            null,
        rim:             null,
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

    // Honour the OS "reduce motion" setting, live, unless overridden with ?spin=1
    // (or localStorage["globe-spin"] = "1") so the rotation can be checked on a
    // machine that has animations turned off.
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let forceSpin = false
    try {
      forceSpin = new URLSearchParams(window.location.search).get("spin") === "1"
        || window.localStorage.getItem("globe-spin") === "1"
    } catch { /* storage blocked: query param still works */ }
    const isReduced = () => mqReduced.matches && !forceSpin

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
        if (state.visible && state.docVisible && !state.running && !isReduced()) startLoop()
        if (!state.visible) stopLoop()
      },
      { threshold: 0.01 },
    )
    io.observe(canvas)

    const onVisChange = () => {
      state.docVisible = !document.hidden
      if (state.docVisible && state.visible && !state.running && !isReduced()) startLoop()
      if (!state.docVisible) stopLoop()
    }
    document.addEventListener("visibilitychange", onVisChange)

    // Capped for frame budget. The sr-only list below renders all of them.
    const sigs = signatures.length > 150 ? signatures.slice(0, 150) : signatures

    // Each signature's permanent label slot, per slot count (desktop 12, phone 6).
    const slotMaps = new Map<number, Map<string, number>>()
    const slotsFor = (n: number) => {
      let m = slotMaps.get(n)
      if (!m) { m = permanentSlots(sigs, n); slotMaps.set(n, m) }
      return m
    }

    function computeGeometry() {
      const { w, h } = state
      const PAD     = 24
      // Phones: the globe sits centred in the band the hero reserves under the
      // copy (MOBILE_GLOBE_H), not beside it.
      if (w < MOBILE_BREAKPOINT) {
        const r = Math.min(w * 0.42, MOBILE_GLOBE_H / 2 - 8)
        return { cx: w / 2, cy: h - MOBILE_GLOBE_H / 2, r }
      }
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

      // 0a. Outer glow (dark): purple halo just outside the limb
      if (colors.glow) {
        const g = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 1.18)
        g.addColorStop(0, colors.glow.inner)
        g.addColorStop(1, colors.glow.outer)
        ctx.beginPath()
        ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }

      // 0b. Drop shadow
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

      // 1b. Rim light (dark): brightens the edge of the sphere from inside
      if (colors.rim) {
        ctx.save()
        ctx.beginPath()
        pathFn({ type: "Sphere" })
        ctx.clip()
        const rg = ctx.createRadialGradient(cx, cy, r * 0.78, cx, cy, r)
        rg.addColorStop(0, "rgba(136,58,152,0)")
        rg.addColorStop(1, colors.rim)
        ctx.fillStyle = rg
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
        ctx.restore()
      }

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

        // Halo, ring, then a bright core, so a dot reads at a glance.
        const core = 2.4 + f * 2.6
        ctx.beginPath()
        ctx.arc(pt[0], pt[1], core * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = colors.dotHalo(f)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(pt[0], pt[1], core + 3, 0, Math.PI * 2)
        ctx.strokeStyle = colors.dotRing(f)
        ctx.lineWidth   = 1
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(pt[0], pt[1], core, 0, Math.PI * 2)
        ctx.fillStyle = colors.dotCore(f)
        ctx.fill()
        if (colors.dotEdge) {
          ctx.strokeStyle = colors.dotEdge
          ctx.lineWidth   = 1.25
          ctx.stroke()
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
          // Keep the DOM tooltip on the dot while the globe turns.
          if (hoverTag) {
            const tx = Math.min(hpt[0] + 14, (state.w || 800) - 160)
            hoverTag.style.transform = `translate(${tx}px, ${hpt[1] - 16}px)`
          }
        } else if (hoverTag) {
          hoverTag.style.opacity = "0"  // rotated behind the limb
        }
      }

      // 6. Every name has one permanent slot on the globe's left face, so its
      // text never moves. The tilt sends dots across the face in different
      // directions on different passes, so a label fades by how close its dot
      // is to the slot (either direction) and by how squarely it faces us. Only
      // the thin leader line moves. The hovered dot is shown by the DOM tooltip.
      ctx.save()
      ctx.font         = colors.labelFont
      ctx.textBaseline = "middle"
      ctx.textAlign    = "left"
      ctx.lineJoin     = "round"
      ctx.miterLimit   = 2

      const slotCount = w < MOBILE_BREAKPOINT ? 6 : 12
      const slotX = cx - r * 0.62
      // The hero is cropped HERO_PEEK short of the globe's full height, so keep the lowest slot above the crop.
      const slotTop    = cy - r * 0.75
      const slotBottom = Math.min(cy + r * 0.75, h - 28)
      const slotY = (i: number) => slotTop + (i * (slotBottom - slotTop)) / (slotCount - 1)
      const slotOf = slotsFor(slotCount)
      const claimed = new Set<number>()

      // Floor sits above the dot cull threshold (0.12), so a label always
      // reaches zero alpha before its dot vanishes at the limb.
      const facing = (f: number) => Math.max(0, Math.min((f - 0.18) / 0.22, 1))

      labels.sort((a, b) => b.f - a.f)  // front-most first when two names share a slot
      for (const l of labels) {
        if (l.sig === state.hoverSig) continue
        const i = slotOf.get(l.sig.id)
        if (i === undefined || claimed.has(i)) continue

        const y     = slotY(i)
        const d     = Math.hypot(l.x - (slotX + 40), l.y - y)
        const alpha = facing(l.f) * Math.max(0, Math.min((1.1 * r - d) / (0.5 * r), 1))
        if (alpha <= 0) continue
        claimed.add(i)

        const text = `${l.sig.name} · ${l.sig.location}`
        const tw   = ctx.measureText(text).width

        // Leave from the nearest point of the text box, so the line never jumps.
        const startX = Math.max(slotX - 6, Math.min(l.x, slotX + tw + 6))
        const startY = y + Math.max(-8, Math.min(l.y - y, 8))
        ctx.globalAlpha = alpha * 0.45
        ctx.strokeStyle = colors.labelText
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(l.x, l.y)
        ctx.stroke()

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

    const onMotionChange = () => {
      if (isReduced()) { stopLoop(); drawFrame(0) }
      else if (state.visible && state.docVisible) startLoop()
    }
    mqReduced.addEventListener("change", onMotionChange)

    if (!isReduced()) startLoop()

    return () => {
      stopLoop()
      mqReduced.removeEventListener("change", onMotionChange)
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
