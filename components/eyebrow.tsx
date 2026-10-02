import { cn } from "@/lib/utils"
import { Dot, type DotVariant } from "./dot"

interface EyebrowProps {
  number: string
  label: string
  dot?: DotVariant
  className?: string
}

export function Eyebrow({ number, label, dot, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {dot && <Dot variant={dot} />}
      <span className="font-mono text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
        {number} / {label}
      </span>
    </div>
  )
}
