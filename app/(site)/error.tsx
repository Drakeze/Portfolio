"use client"

import { AccentHeading } from "@/components/accent-heading"
import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"

/**
 * No console.error here: PostHog already captures exceptions via
 * instrumentation-client, and logging re-printed the stack trace into the
 * visitor's console.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-6 py-32">
      <Eyebrow number="500" label="ERROR" dot="tool" />
      <AccentHeading plain="Something went " accent="wrong" as="h1" size="lg" />
      <p className="max-w-[48ch] text-[17px] text-muted-foreground">
        That is on me, not you. Try again, or head back to the homepage.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Try again
      </button>
    </Container>
  )
}
