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
    </div>
  )
}
