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

        {/* Local Sub-Navigation */}
        <nav
          className="mb-8 md:mb-12 flex justify-center"
          aria-label="Projects section navigation"
        >
          <div className="inline-flex rounded-lg border border-brand-purple/40 overflow-hidden">
            <Link
              href="/projects"
              aria-current={isProjects ? "page" : undefined}
              className={`px-4 py-2 text-sm font-medium transition ${
                isProjects
                  ? "bg-brand-purple/15 text-brand-purple"
                  : "hover:bg-brand-purple/10 text-muted-foreground"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/projects/company"
              aria-current={isCompany ? "page" : undefined}
              className={`px-4 py-2 text-sm font-medium transition ${
                isCompany
                  ? "bg-brand-purple/15 text-brand-purple"
                  : "hover:bg-brand-purple/10 text-muted-foreground"
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
