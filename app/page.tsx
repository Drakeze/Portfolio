import { DeferredGlobe } from "@/components/deferred-globe"
import { ProjectCard } from "@/components/sections/project-card"
import { Button } from "@/components/ui/button"
import { getPublicProjects } from "@/lib/public-content"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

export default async function Page() {
  const projects = await getPublicProjects()
  const featured = projects.slice(0, 3)

  return (
    <main>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute -right-64 top-1/2 h-180 w-180 -translate-y-1/2 opacity-50 sm:-right-56 md:-right-64 md:h-225 md:w-225 lg:-right-32 lg:h-250 lg:w-250">
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

      {featured.length > 0 && (
        <section className="bg-muted/30 border-t px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Work</h2>
                <p className="text-muted-foreground">A few recent projects worth looking at.</p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex items-center gap-1">
                <Link href="/projects">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project._id ?? project.slug ?? project.title} project={project} variant="featured" />
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Button variant="outline" asChild className="w-full">
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
