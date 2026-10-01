"use client"

import { useRef, useState } from "react"
import { TransformComponent, TransformWrapper, type ReactZoomPanPinchRef } from "react-zoom-pan-pinch"

type Sheet = { label: string; svgPath: string }

export function SvgViewer({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState(0)
  const transformRef = useRef<ReactZoomPanPinchRef>(null)

  function reset() {
    transformRef.current?.resetTransform()
  }

  const sheet = sheets[active]

  if (!sheets.length) {
    return (
      <div className="h-[380px] rounded-2xl border border-dashed border-border flex items-center justify-center">
        <p className="font-mono text-[12px] text-muted-foreground">Drawing sheets coming soon.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Sheet tab strip */}
      {sheets.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {sheets.map((s, i) => (
            <button
              key={s.label}
              onClick={() => {
                setActive(i)
                reset()
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-mono transition-colors ${
                i === active
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
              }`}
              aria-pressed={i === active}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Viewer */}
      <div className="relative rounded-2xl border border-border overflow-hidden bg-muted/20 h-[620px]">
        <TransformWrapper ref={transformRef} minScale={0.5} maxScale={5} centerOnInit>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {sheet?.svgPath ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sheet.svgPath}
                    alt={sheet.label}
                    className="max-w-none"
                    style={{ maxHeight: "580px" }}
                  />
                ) : (
                  <p className="font-mono text-[12px] text-muted-foreground">Sheet not available.</p>
                )}
              </TransformComponent>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => zoomOut()}
                  aria-label="Zoom out"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  −
                </button>
                <button
                  onClick={() => zoomIn()}
                  aria-label="Zoom in"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  +
                </button>
                <button
                  onClick={() => resetTransform()}
                  aria-label="Reset zoom"
                  className="rounded-full border border-border bg-background px-3 h-8 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Fallback link to raw sheet */}
      {sheet?.svgPath ? (
        <a
          href={sheet.svgPath}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          Open raw sheet →
        </a>
      ) : null}
    </div>
  )
}
