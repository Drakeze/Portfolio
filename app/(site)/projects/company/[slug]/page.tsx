import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AccentHeading } from "@/components/accent-heading"
import { CompanyGallery } from "@/components/company/company-gallery"
import { Container } from "@/components/container"
import { Eyebrow } from "@/components/eyebrow"
import { SectionDivider } from "@/components/section-divider"
import { getPublicCompanies } from "@/lib/public-content"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export const revalidate = 3600

type CompanyPageProps = { params: Promise<{ slug: string }> }

/** listCompanies() has no stable tiebreak, so prev/next could reorder between requests. */
async function orderedCompanies() {
  const companies = await getPublicCompanies()
  return [...companies].sort((a, b) => a.slug.localeCompare(b.slug))
}

export async function generateStaticParams() {
  const companies = await orderedCompanies().catch(() => [])
  return companies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params
  const company = (await orderedCompanies()).find((entry) => entry.slug === slug)
  if (!company) return {}

  // Without this every company page inherited the root title, so they all
  // shared one title and competed with each other.
  const title = `${company.title} | ${siteConfig.name}`
  return {
    title,
    description: company.tagline,
    alternates: { canonical: `/projects/company/${company.slug}` },
    openGraph: { title, description: company.tagline, url: absoluteUrl(`/projects/company/${company.slug}`) },
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  const companies = await orderedCompanies()
  const index = companies.findIndex((company) => company.slug === slug)
  if (index === -1) notFound()

  const company = companies[index]
  const previous = companies[index - 1]
  const next = companies[index + 1]

  return (
    <Container as="article" className="flex flex-col gap-16 py-16">
      <header className="flex flex-col gap-4">
        <Eyebrow number="01" label="COMPANY" dot="client" />
        <AccentHeading plain={`${company.title} `} accent="work" as="h1" size="lg" />
        {company.tagline ? <p className="max-w-[60ch] text-[17px] text-muted-foreground">{company.tagline}</p> : null}
      </header>

      <section className="overflow-hidden rounded-[20px] border border-border">
        {company.Banner ? (
          <company.Banner href={company.liveUrl} />
        ) : company.gallery && company.gallery.length > 0 ? (
          <CompanyGallery images={company.gallery} />
        ) : (
          <div className="flex h-[400px] items-center justify-center bg-surface-sunken">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">Visuals coming soon</p>
          </div>
        )}
      </section>

      <SectionDivider number="02" />

      <section className="flex max-w-[68ch] flex-col gap-6">
        {company.longDescription.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </section>

      <SectionDivider number="03" />

      <section className="flex flex-col gap-8">
        <Eyebrow number="03" label="STACK" dot="architecture" />
        <div className="flex flex-wrap gap-2">
          {company.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[12px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {/* Was hardcoded `disabled` with "Still in development", even when a live URL existed. */}
          {company.liveUrl ? (
            <a
              href={company.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Visit site
            </a>
          ) : (
            <span className="rounded-full border border-border px-6 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
              In development
            </span>
          )}

          {company.githubUrl ? (
            <a
              href={company.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </section>

      <nav aria-label="Companies" className="flex items-center justify-between gap-6 border-t border-border pt-8">
        {previous ? (
          <Link
            href={`/projects/company/${previous.slug}`}
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}

        <Link
          href="/work"
          className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          All work
        </Link>

        {next ? (
          <Link
            href={`/projects/company/${next.slug}`}
            className="text-right font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  )
}
