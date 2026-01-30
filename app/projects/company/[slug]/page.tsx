import { notFound } from "next/navigation"
import { companies } from "@/lib/companies"
import { descriptions } from "@/lib/description"
import { ProjectCard } from "@/components/sections/project-card"

type CompanyPageProps = {
  params: {
    slug: string
  }
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(" website", "")
    .replace(/\s+/g, "-")
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = params

  const index = companies.findIndex(
    (company) => slugify(company.title) === slug
  )

  if (index === -1) {
    notFound()
  }

  const company = companies[index]
  const description = descriptions[index]

  const prevCompany = companies[index - 1]
  const nextCompany = companies[index + 1]

  const prevSlug = prevCompany ? slugify(prevCompany.title) : null
  const nextSlug = nextCompany ? slugify(nextCompany.title) : null

  const allSlugs = companies.map((c) => slugify(c.title))

  return (
    <div className="flex flex-col items-center text-center">
      {/* Company Title */}
      <h1 className="text-4xl md:text-5xl font-semibold mb-4">
        {company.title}
      </h1>

      {/* Divider */}
      <div className="w-24 h-px bg-muted-foreground/40 mb-10" />

      {/* Long Description */}
      <div className="max-w-3xl space-y-6 mb-16 text-left">
        {description.longDescription
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
      </div>

      {/* Artifact Card */}
      <div className="w-full max-w-xl">
        <ProjectCard project={company} variant="detailed" />
      </div>

      {/* Company Pagination */}
      <nav
        className="mt-16 flex justify-center"
        aria-label="Company pagination"
      >
        <div className="inline-flex items-center gap-6 rounded-lg border border-muted px-6 py-3 text-sm text-muted-foreground">

          {/* Previous Arrow */}
          {prevSlug ? (
            <a
              href={`/projects/company/${prevSlug}`}
              className="hover:text-foreground transition"
              aria-label="Previous company"
            >
              &lt;
            </a>
          ) : (
            <span className="opacity-40">&lt;</span>
          )}

          {/* Numeric Links */}
          {allSlugs.map((companySlug, i) => {
            const isActive = companySlug === slug

            return (
              <a
                key={companySlug}
                href={`/projects/company/${companySlug}`}
                aria-current={isActive ? "page" : undefined}
                className={`transition ${
                  isActive
                    ? "text-foreground font-medium"
                    : "hover:text-foreground"
                }`}
              >
                {i + 1}
              </a>
            )
          })}

          {/* Next Arrow */}
          {nextSlug ? (
            <a
              href={`/projects/company/${nextSlug}`}
              className="hover:text-foreground transition"
              aria-label="Next company"
            >
              &gt;
            </a>
          ) : (
            <span className="opacity-40">&gt;</span>
          )}
        </div>
      </nav>
    </div>
  )
}
