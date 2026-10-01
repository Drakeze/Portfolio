import { cn } from "@/lib/utils"
import type React from "react"

type Size = "sm" | "lg" | "xl" | "hero"
type Tag = "h1" | "h2" | "h3" | "h4" | "p"

const SIZE_MAP: Record<Size, { plain: string; accent: string }> = {
  sm: { plain: "text-[34px]", accent: "text-[42px]" },
  lg: { plain: "text-[44px]", accent: "text-[52px]" },
  xl: { plain: "text-[56px]", accent: "text-[66px]" },
  hero: { plain: "text-[76px]", accent: "text-[88px]" },
}

interface AccentHeadingProps {
  plain: React.ReactNode
  accent: string
  as?: Tag
  size?: Size
  className?: string
}

export function AccentHeading({ plain, accent, as: Tag = "h2", size = "lg", className }: AccentHeadingProps) {
  const s = SIZE_MAP[size]
  return (
    <Tag
      className={cn(
        "font-medium leading-[1.05] tracking-[-0.03em] text-foreground",
        s.plain,
        className,
      )}
    >
      {plain}
      <span className={cn("font-serif italic tracking-[-0.01em]", s.accent)}>{accent}</span>
    </Tag>
  )
}
