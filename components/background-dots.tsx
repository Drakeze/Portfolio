import { Dot, type DotVariant } from "./dot"

const DOTS: Array<{ variant: DotVariant; top: string; left?: string; right?: string }> = [
  { variant: "status",       top: "6%",  left: "2%" },
  { variant: "product",      top: "12%", right: "3%" },
  { variant: "client",       top: "22%", left: "1%" },
  { variant: "tool",         top: "35%", right: "2%" },
  { variant: "architecture", top: "50%", left: "3%" },
  { variant: "status",       top: "62%", right: "4%" },
  { variant: "product",      top: "74%", left: "2%" },
  { variant: "tool",         top: "84%", right: "2%" },
  { variant: "client",       top: "92%", left: "5%" },
  { variant: "architecture", top: "18%", right: "4%" },
  { variant: "status",       top: "45%", right: "1%" },
  { variant: "product",      top: "70%", right: "2%" },
  { variant: "tool",         top: "30%", left: "50%" },
  { variant: "client",       top: "58%", left: "45%" },
  { variant: "architecture", top: "8%",  left: "55%" },
  { variant: "status",       top: "88%", left: "60%" },
]

export function BackgroundDots() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map(({ variant, ...pos }, i) => (
        <div key={i} className="absolute opacity-50" style={pos}>
          <Dot variant={variant} />
        </div>
      ))}
    </div>
  )
}
