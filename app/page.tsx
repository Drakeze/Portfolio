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
    <main className="relative flex flex-col flex-1">
      {/* Hero */}
      <section className="relative flex-1 flex items-center px-5 sm:px-10 lg:px-20 py-16 lg:py-0 overflow-hidden">
        {/* Left content — capped so it doesn't reach the globe at lg */}
        <div className="relative z-10 flex flex-col gap-7 w-full max-w-[440px] lg:max-w-[500px] xl:max-w-[580px]">
          <p className="font-mono text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
            Developer / Architectural Designer / Los Angeles
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
            structured, whether it&apos;s a codebase or a floor plan.
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
        <div className="hidden lg:block absolute right-[-80px] xl:right-[-60px] top-1/2 -translate-y-[52%] lg:w-[580px] lg:h-[580px] xl:w-[700px] xl:h-[700px]">
          <DeferredGlobe contactPins={contactPins} />
        </div>
      </section>

      {/* Workshop band */}
      <section className="bg-[#0E0E10]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 px-5 sm:px-10 lg:px-20 py-14">
          <div className="flex flex-col gap-4 max-w-[560px]">
            <span className="inline-flex w-fit rounded-full bg-amber-400 text-[#0E0E10] font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1">
              The Workshop
            </span>
            <AccentHeading
              plain="Where the tools I build "
              accent="myself"
              as="h2"
              size="sm"
              className="text-white"
            />
            <p className="text-[16px] text-white/60 leading-relaxed">
              Stream tools, overlays, a translation API, and whatever I&apos;m tinkering with this month.
            </p>
          </div>
          <Link
            href="/about?tab=workshop"
            className="shrink-0 rounded-full border border-white/30 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Open the workshop →
          </Link>
        </div>
      </section>
    </main>
  )
}
