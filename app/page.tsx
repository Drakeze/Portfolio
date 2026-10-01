import { AccentHeading } from "@/components/accent-heading"
import { DeferredGlobe } from "@/components/deferred-globe"
import { type GlobePoint } from "@/components/globe-realistic"
import { listPublicPins } from "@/lib/domains/messages/service"
import Link from "next/link"

export const revalidate = 3600

async function getContactPins(): Promise<GlobePoint[]> {
  try {
    const pins = await listPublicPins()
    return pins.map((pin) => ({ ...pin, source: "contact" }))
  } catch {
    return []
  }
}

export default async function Page() {
  const contactPins = await getContactPins()

  return (
    <main className="relative flex flex-col flex-1 overflow-hidden">
      {/* Purple radial glow — sits behind the globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-purple-100) 0%, var(--color-purple-50) 45%, transparent 70%)",
        }}
      />

      {/* Hero */}
      <section className="relative flex-1 flex items-center px-5 sm:px-10 lg:px-20 py-16 lg:py-0 overflow-hidden">
        {/* Left content — capped so it doesn't reach the globe at lg */}
        <div className="relative z-10 flex flex-col gap-7 w-full max-w-[440px] lg:max-w-[500px] xl:max-w-[580px]">
          <p className="font-mono text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
            Developer / Architectural Designer — Los Angeles
          </p>

          <AccentHeading
            plain={
              <>
                I build software
                <br />
                and design{" "}
              </>
            }
            accent="buildings."
            as="h1"
            size="hero"
          />

          <p className="text-[19px] text-muted-foreground max-w-[520px] leading-relaxed">
            Full-stack developer, training to become an architectural engineer. I care about how things are
            structured — whether it&apos;s a codebase or a floor plan.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View work →
            </Link>
            <Link
              href="/architecture"
              className="rounded-full border border-border-strong text-foreground px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              Read a case study
            </Link>
          </div>

          <Link
            href="/contact"
            className="font-mono text-[13px] underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            or + add your name to the globe →
          </Link>
        </div>

        {/* Globe — absolutely positioned at right edge, cropped by section overflow:hidden */}
        <div className="hidden lg:block absolute right-[-80px] xl:right-[-40px] top-1/2 -translate-y-[52%] lg:w-[500px] lg:h-[500px] xl:w-[620px] xl:h-[620px] rotate-[-18deg]">
          <DeferredGlobe contactPins={contactPins} />
        </div>
      </section>
    </main>
  )
}
