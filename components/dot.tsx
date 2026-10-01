import { cn } from "@/lib/utils"

export type DotVariant = "status" | "product" | "client" | "tool" | "architecture"

const DOT_COLOR: Record<DotVariant, string> = {
  status: "bg-dot-status",
  product: "bg-dot-product",
  client: "bg-dot-client",
  tool: "bg-dot-tool",
  architecture: "bg-dot-architecture",
}

export function Dot({ variant, className }: { variant: DotVariant; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-[7px] shrink-0 rounded-full", DOT_COLOR[variant], className)}
    />
  )
}
