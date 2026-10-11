"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import type React from "react"

import type { Signature } from "@/lib/types/signature"

import { HERO_PEEK } from "./constants"

const DeferredSignatureGlobe = dynamic(
  () => import("@/components/hero/SignatureGlobe").then((m) => m.SignatureGlobe),
  { ssr: false },
)

export function Hero({ signatures }: { signatures: Signature[] }) {
  return (
    <section
      className="relative flex flex-1 items-center overflow-hidden"
      style={{ minHeight: `max(620px, calc(100svh - var(--nav-h) - ${HERO_PEEK}px))` }}
    >
      {/* Canvas globe — absolutely positioned, fills section, sits behind copy */}
      <DeferredSignatureGlobe signatures={signatures} />

      {/* Copy block — above canvas */}
      <div className="relative z-10 flex flex-col gap-7 px-10 w-full max-w-[760px]">
        {/* Eyebrow — plain mono, no dots */}
        <p className="font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase">
          Developer / Architectural Designer · Los Angeles
        </p>

        {/* Headline — balanced 2-line wrap, no manual break */}
        <h1
          className="font-sans font-medium text-foreground"
          style={{
            fontSize: "clamp(42px, 5.4vw, 70px)",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            maxWidth: "13ch",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          I build software and design{" "}
          <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 400, display: "inline" }}>buildings.</em>
        </h1>

        {/* Sub */}
        <p className="text-[16px] leading-[1.6] max-w-[42ch] text-muted-foreground">
          Full-stack developer learning to become an architectural engineer. Mixing my dreams together.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View work →
          </Link>
          <Link
            href="/architecture"
            className="rounded-full border border-border-strong text-foreground px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
          >
            Read a case study
          </Link>
        </div>

        {/* Tiny link — underline scoped to text width only */}
        <Link
          href="/contact"
          className="font-mono text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="border-b border-current">or → add your name to the globe →</span>
        </Link>
      </div>
    </section>
  )
}
