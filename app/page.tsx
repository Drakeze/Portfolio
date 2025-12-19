import { GlobeWireframe } from "@/components/globe-wireframe"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-30 pointer-events-none">
          <GlobeWireframe />
        </div>

        <div className="container relative z-10 px-6 py-24 mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance mb-6">Developer & Designer</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty mb-12">
              Building systems that connect people globally. Creating thoughtful interfaces that blend design with
              engineering.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" asChild>
                <Link href="/projects">View Projects</Link>
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
