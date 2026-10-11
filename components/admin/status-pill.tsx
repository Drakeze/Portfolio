import { Dot, type DotVariant } from "@/components/dot"
import { cn } from "@/lib/utils"

/**
 * The admin's only status indicator.
 *
 * It exists because the admin had eight different greens for one "good"
 * concept (bg-green-100, bg-green-500/10, text-green-400/500/600/700,
 * text-emerald-600) while the design system has exactly one, --dot-status.
 * Tones map onto the five documented dot variants, so a pill can never
 * introduce a colour that is not in the system.
 */
export type PillTone = DotVariant | "neutral"

export function StatusPill({
  tone,
  label,
  className,
}: {
  tone: PillTone
  label: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground",
        className,
      )}
    >
      {tone === "neutral" ? null : <Dot variant={tone} />}
      {label}
    </span>
  )
}
