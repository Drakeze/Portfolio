import { Hero } from "@/components/hero/Hero"
import { AccentHeading } from "@/components/accent-heading"
import Link from "next/link"
// AccentHeading and Link remain used in the workshop band below

export const revalidate = 3600

export default async function Page() {
  return (
    <main className="relative flex flex-col flex-1">
      <Hero />

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
