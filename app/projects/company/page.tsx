import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { companies } from "@/lib/companies"
import { descriptions } from "@/lib/description"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Companies - ${siteConfig.name}`,
  description: "A selection of companies I started and am currently building.",
}

function slugify(title: string) {
  return title.toLowerCase().replace(" website", "").replace(/\s+/g, "-")
}

export default function CompanyProjectsPage() {
  return (
    <div className="space-y-12">
      <section className="max-w-3xl space-y-4">
        <h2 className="text-2xl font-semibold">Company Initiatives</h2>
        <p className="text-muted-foreground">
          These initiatives are the long-term systems I am building beyond individual projects.
          Each company has its own page with the full story, current direction, and repository links.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {companies.map((company, index) => {
          const slug = slugify(company.title)
          const detailsPath = `/projects/company/${slug}`
          const shortDescription = descriptions[index]?.shortDescription

          return (
            <Card key={company.title} className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{company.title.replace(" Website", "")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {shortDescription ?? company.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <Link href={detailsPath}>Open Company Page</Link>
                </Button>

                {company.githubUrl ? (
                  <Button variant="outline" asChild>
                    <a href={company.githubUrl} target="_blank" rel="noopener noreferrer">
                      View Repo
                    </a>
                  </Button>
                ) : null}
              </div>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
