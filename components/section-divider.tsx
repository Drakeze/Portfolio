import { cn } from "@/lib/utils"

interface SectionDividerProps {
  number: string
  className?: string
}

export function SectionDivider({ number, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 py-8", className)} aria-hidden="true">
      <div className="w-px h-3 shrink-0 bg-border-strong" />
      <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground shrink-0">{number}</span>
      <div className="flex-1 h-px bg-border" />
      <div className="w-px h-3 shrink-0 bg-border-strong" />
    </div>
  )
}
