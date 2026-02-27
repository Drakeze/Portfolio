import { CompanyGallery } from "@/components/company/company-gallery"
import { Button } from "@/components/ui/button"
import { companies } from "@/lib/types/companies"
import { notFound } from "next/navigation"

type CompanyPageProps = {
  params: {
    slug: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = params

  const index = companies.findIndex(
    (company) => company.slug === slug
  )

  if (index === -1) {
    notFound()
  }

  const company = companies[index]

  const prevCompany = companies[index - 1]
  const nextCompany = companies[index + 1]

  const prevSlug = prevCompany ? prevCompany.slug : null
  const nextSlug = nextCompany ? nextCompany.slug : null

  const allSlugs = companies.map((c) => c.slug)

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <h1 className="text-4xl md:text-5xl font-semibold">
          {company.title}
        </h1>
        {company.tagline && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {company.tagline}
          </p>
        )}
      </section>

      {/* Long Description */}
      <section className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed">
        {company.longDescription
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
      </section>

      {/* Slideshow Gallery */}
      <section className="max-w-5xl mx-auto">
        {company.gallery && company.gallery.length > 0 ? (
          <div className="rounded-2xl overflow-hidden border shadow-md">
            <CompanyGallery images={company.gallery} />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 h-[420px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Gallery space — visuals coming soon
            </p>
          </div>
        )}
      </section>

      {/* Full Width Tech + Repo Section */}
      <section className="rounded-2xl border p-12 space-y-12 bg-background shadow-sm">
          <h2 className="text-2xl font-semibold text-center">
              Architecture & Technology
          </h2>
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 justify-center">
          {company.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-md bg-muted/60 border border-muted-foreground/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          {company.liveUrl && (
            <Button asChild>
              <a href={company.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          )}

          {company.githubUrl && (
            <Button variant="outline" asChild>
              <a href={company.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub Organization
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Company Pagination */}
      <nav className="flex justify-center" aria-label="Company pagination">
        <div className="inline-flex items-center gap-6 rounded-lg border border-muted px-6 py-3 text-sm text-muted-foreground">

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
