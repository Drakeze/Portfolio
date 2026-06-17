"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isProjects = pathname === "/projects"
  const isCompany = pathname.startsWith("/projects/company")

  return (
    <main className="min-h-screen py-12 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-6 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            My Work
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A section of my work showcasing a range of technologies and stacks of things I have built.
          </p>
        </header>

        {/* Local Sub-Navigation */}
        <nav
          className="mb-8 md:mb-12 flex justify-center md:justify-end"
          aria-label="Projects section navigation"
        >
          <div className="inline-flex rounded-lg border border-purple-300/40 overflow-hidden">
            <Link
              href="/projects"
              aria-current={isProjects ? "page" : undefined}
              className={`px-4 py-2 text-sm font-medium transition ${
                isProjects
                  ? "bg-purple-500/15 text-purple-600"
                  : "hover:bg-purple-500/10 text-muted-foreground"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/projects/company"
              aria-current={isCompany ? "page" : undefined}
              className={`px-4 py-2 text-sm font-medium transition ${
                isCompany
                  ? "bg-purple-500/15 text-purple-600"
                  : "hover:bg-purple-500/10 text-muted-foreground"
              }`}
            >
              Company
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <section>{children}</section>

      </div>
    </main>
  )
}
