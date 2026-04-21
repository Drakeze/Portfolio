import { DeferredGlobe } from "@/components/deferred-globe"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute -right-64 top-1/2 h-[720px] w-[720px] -translate-y-1/2 opacity-50 sm:-right-56 md:-right-64 md:h-[900px] md:w-[900px] lg:-right-32 lg:h-[1000px] lg:w-[1000px]">
          <DeferredGlobe />
        </div>

        <div className="container relative z-10 px-6 py-24 mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance mb-6">
              Anthony Shead
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty mb-12">
              Full-stack developer building reliable, intuitive web experiences with Next.js, TypeScript, and thoughtful
              design.
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
