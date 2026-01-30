import type { Metadata } from "next"
import { companies } from "@/lib/companies"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Companies - ${siteConfig.name}`,
  description: "A selection of companies I started and am currently building.",
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(" website", "")
    .replace(/\s+/g, "-")
}

export default function CompanyProjectsPage() {
  const companySlugs = companies.map((company) => slugify(company.title))
  const firstSlug = companySlugs[0]
  const lastSlug = companySlugs[companySlugs.length - 1]

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

      <nav
        className="mt-12 flex justify-center"
        aria-label="Company selection"
      >
        <div className="inline-flex items-center gap-4 rounded-lg border border-muted px-4 py-2 text-sm text-muted-foreground">

          {/* Jump to first company */}
          <a
            href={`/projects/company/${firstSlug}`}
            className="hover:text-foreground transition"
            aria-label="First company"
          >
            &lt;
          </a>

          {/* Numeric company links */}
          {companySlugs.map((slug, index) => (
            <a
              key={slug}
              href={`/projects/company/${slug}`}
              className="hover:text-foreground transition"
            >
              {index + 1}
            </a>
          ))}

          {/* Jump to last company */}
          <a
            href={`/projects/company/${lastSlug}`}
            className="hover:text-foreground transition"
            aria-label="Last company"
          >
            &gt;
          </a>
        </div>
      </nav>
    </>
  )
}