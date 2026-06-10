import { DeferredGlobe } from "@/components/deferred-globe"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const runtime = "edge"
export const revalidate = 3600

export default function Page() {
  return (
    <main>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute -right-64 top-1/2 h-180 w-180 -translate-y-1/2 opacity-50 sm:-right-56 md:-right-64 md:h-225 md:w-225 lg:-right-32 lg:h-250 lg:w-250">
          <DeferredGlobe />
        </div>

        <div className="container relative z-10 px-6 py-24 mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-balance mb-6">
              Anthony Shead
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty mb-12">
              A Developer, Streamer, and Gymaholic based in the US with a passion for building cool stuff and sharing it with the world.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" asChild>
                <Link href="/projects">My Work</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
