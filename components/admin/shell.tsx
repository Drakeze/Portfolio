import Link from "next/link"

import { AccentHeading } from "@/components/accent-heading"
import { Container } from "@/components/container"
import type { DotVariant } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"

/** Admin chrome. Uses the design system's <Container>, not its own max-width. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  return <Container className="flex-1 py-10">{children}</Container>
}

/**
 * The page header every admin screen shares. Replaces nine hand-copied
 * `<h1 className="text-3xl font-semibold tracking-tight">` blocks, and brings
 * the admin onto the same eyebrow + one-serif-word heading as the public site.
 */
export function PageHeader({
  number,
  eyebrow,
  dot,
  plain,
  accent,
  description,
  action,
}: {
  number: string
  eyebrow: string
  dot?: DotVariant
  plain: string
  accent: string
  description?: string
  action?: { label: string; href: string }
}) {
  return (
    <header className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-3">
        <Eyebrow number={number} label={eyebrow} dot={dot} />
        <AccentHeading plain={plain} accent={accent} as="h1" size="sm" />
        {description ? <p className="max-w-[60ch] text-muted-foreground">{description}</p> : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="rounded-full bg-primary px-5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  )
}
