import type { Metadata } from "next"

import { CompanyGallery } from "@/components/company/company-gallery"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPublicCompanies } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: `Companies - ${siteConfig.name}`,
  description: "A selection of companies I started and am currently building.",
}

export default async function CompanyProjectsPage() {
  const companies = await getPublicCompanies()

  return (
    <div className="space-y-20 py-16">
      <section className="max-w-4xl mx-auto text-center space-y-6 pt-8">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Company Initiatives</h2>
        <p className="text-muted-foreground">
          These initiatives are the long-term systems I am building beyond individual projects.
          Each company has its own page with the full story, current direction, and repository links.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {companies.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground md:col-span-2">No companies published yet.</Card>
        ) : companies.map((company) => {
          return (
            <Card
              key={company.slug}
              className="p-8 space-y-6 rounded-2xl transition hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{company.title}</h3>
                <p className="text-sm font-medium text-primary">
                  {company.tagline}
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {company.shortDescription}
              </p>
              
              {/* Slideshow */}
              {company.gallery && company.gallery.length > 0 && (
                <CompanyGallery images={company.gallery} />
              )}

              {/* Long Description */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {company.longDescription
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>

              

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-4">
                {company.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-muted/60 border border-muted-foreground/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="secondary" disabled>
                  Still in development
                </Button>

                {company.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={company.githubUrl} target="_blank" rel="noopener noreferrer">
                      View GitHub Organization
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
