import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/seo"

export const alt = `${siteConfig.name} · Developer and Architectural Designer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Generated from the design system's own tokens rather than a static asset, so
 * it cannot drift from the site. Values are literal here because satori has no
 * access to CSS custom properties.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F5F3",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#3FA66B" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6B6B70",
            }}
          >
            Drakeze
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 86, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0E0E10" }}>
            I build software and design buildings.
          </div>
          <div style={{ fontSize: 30, color: "#6B6B70" }}>
            Anthony Shead · Developer / Architectural Designer
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9A9AA0" }}>
          <span>www.drakeze.com</span>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {["#2AA79B", "#4A7BD0", "#E0A93B", "#883A98"].map((colour) => (
              <div key={colour} style={{ width: 12, height: 12, borderRadius: 9999, background: colour }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
