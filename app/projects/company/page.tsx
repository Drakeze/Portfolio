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
        ) : companies.map((company) => (
          <Card
            key={company.slug}
            className="overflow-hidden rounded-2xl transition hover:shadow-lg hover:-translate-y-1 duration-300"
          >
            {/* Banner — bare, full width at top */}
            {company.Banner ? (
              <div className="overflow-hidden rounded-t-2xl">
                <company.Banner href={company.liveUrl} bare />
              </div>
            ) : company.gallery && company.gallery.length > 0 ? (
              <CompanyGallery images={company.gallery} />
            ) : null}

            {/* Buttons — right under the animation */}
            <div className="p-4 border-b border-border">
              <div className="flex flex-wrap gap-3">
                {company.liveUrl ? (
                  <Button asChild>
                    <a href={company.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit Live Website
                    </a>
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Still in development
                  </Button>
                )}
                {company.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={company.githubUrl} target="_blank" rel="noopener noreferrer">
                      View GitHub Organization
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p className="text-base">{company.shortDescription}</p>
              {company.longDescription
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}
