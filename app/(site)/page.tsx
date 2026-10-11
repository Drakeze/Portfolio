import Link from "next/link"

import { AccentHeading } from "@/components/accent-heading"
import { Hero } from "@/components/hero/Hero"
import { listGlobeSignatures } from "@/lib/domains/messages/service"
import { SIGNATURE_FIXTURE } from "@/lib/globe/fixture"

export const revalidate = 3600

export default async function Page() {
  // Real approved signatures, falling back to the fixture so the globe is
  // never empty. /contact and the sign-globe banner both promise that a
  // submitted name appears here; until now nothing read them back.
  const signed = await listGlobeSignatures().catch(() => [])
  const signatures = signed.length > 0 ? signed : SIGNATURE_FIXTURE

  return (
    <main className="relative flex flex-col flex-1">
      <Hero signatures={signatures} />

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
