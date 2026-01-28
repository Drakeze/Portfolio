import type { Metadata } from "next"
import { descriptions } from "@/lib/description"
import { ProjectCard } from "@/components/sections/project-card"
import { companies } from "@/lib/companies"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Companies - ${siteConfig.name}`,
  description: "A selection of companies I started and am currently building.",
}

export default function CompanyProjectsPage() {
  return (
    <>
      <section className="max-w-3xl mb-16 space-y-6">
        <h2 className="text-2xl font-semibold">
          Building Beyond Individual Projects
        </h2>

        <p className="text-muted-foreground">
          The companies I’m building represent long-term systems rather than isolated builds.
          They are designed to grow, adapt, and support real-world use cases over time,
          rather than exist as one-off implementations.
        </p>

        <p className="text-muted-foreground">
          This work reflects how I think about software not just as code,
          but as infrastructure for ideas, collaboration, and impact.
          Each initiative below is intentionally structured with longevity in mind.
        </p>
      </section>

      {companies.map((company, index) => (
        <section key={company.title} className="mb-24">
          <h3 className="text-3xl font-semibold mb-6">
            {company.title}
          </h3>

          <div className="max-w-3xl space-y-4 mb-10">
            {descriptions[index].longDescription
              .split("\n\n")
              .map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="max-w-xl">
            <ProjectCard project={company} variant="detailed" />
          </div>
        </section>
      ))}
    </>
  )
}