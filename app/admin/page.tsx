import Link from "next/link"

import { ChangePasswordForm } from "@/components/admin/change-password-form"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { Dot, type DotVariant } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"
import { getBio } from "@/lib/domains/bio/service"
import { listCertifications } from "@/lib/domains/certifications/service"
import { countCompanies } from "@/lib/domains/companies/service"
import { getLinks } from "@/lib/domains/links/service"
import { countPendingNameSubmissions, listMessages } from "@/lib/domains/messages/service"
import { countProjects } from "@/lib/domains/projects/service"
import { getResume } from "@/lib/domains/resume/service"
import { listSkills } from "@/lib/domains/skills/service"

type Tile = { label: string; value: number; href: string; dot: DotVariant }

export default async function AdminPage() {
  const [projects, companies, skills, certifications, messages, pendingNames, bio, links, resume] = await Promise.all([
    countProjects(),
    countCompanies(),
    listSkills(),
    listCertifications(),
    listMessages(),
    countPendingNameSubmissions(),
    getBio(),
    getLinks(),
    getResume(),
  ])

  const unread = messages.filter((message) => !message.read).length

  const tiles: Tile[] = [
    { label: "Projects", value: projects, href: "/admin/projects", dot: "product" },
    { label: "Companies", value: companies, href: "/admin/companies", dot: "client" },
    { label: "Skills", value: skills.length, href: "/admin/skills", dot: "tool" },
    { label: "Certifications", value: certifications.length, href: "/admin/certifications", dot: "architecture" },
    { label: "Unread", value: unread, href: "/admin/messages", dot: "status" },
  ]

  const content = [
    { label: "Bio", href: "/admin/bio", ready: Boolean(bio) },
    { label: "Links", href: "/admin/links", ready: Boolean(links) },
    { label: "Resume", href: "/admin/resume", ready: Boolean(resume) },
  ]

  const recent = messages.slice(0, 5)

  return (
    <>
      <PageHeader
        number="00"
        eyebrow="DASHBOARD"
        dot="status"
        plain="Your "
        accent="portfolio"
        description="Content counts, inbound messages, and anything waiting on you."
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="group flex flex-col gap-3 rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-border-strong"
          >
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              <Dot variant={tile.dot} />
              {tile.label}
            </span>
            <span className="text-[34px] font-medium leading-none tracking-[-0.03em] text-foreground">{tile.value}</span>
          </Link>
        ))}
      </section>

      {pendingNames > 0 ? (
        <Link
          href="/admin/names"
          className="mt-6 flex items-center justify-between gap-4 rounded-[14px] border border-border bg-accent p-6 transition-colors hover:border-border-strong"
        >
          <span className="text-[17px] text-foreground">
            {pendingNames} globe {pendingNames === 1 ? "signature" : "signatures"} waiting for approval
          </span>
          <StatusPill tone="tool" label="Review" />
        </Link>
      ) : null}

      <section className="mt-16">
        <Eyebrow number="01" label="SINGLE PAGE CONTENT" dot="architecture" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between gap-4 rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-border-strong"
            >
              <span className="text-[17px] font-medium text-foreground">{item.label}</span>
              <StatusPill tone={item.ready ? "status" : "neutral"} label={item.ready ? "Set" : "Empty"} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <Eyebrow number="02" label="RECENT MESSAGES" dot="status" />
          <Link
            href="/admin/messages"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            View all
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {recent.length === 0 ? (
            <p className="rounded-[14px] border border-border bg-card px-6 py-10 text-center text-muted-foreground">
              No messages yet.
            </p>
          ) : (
            recent.map((message) => (
              <Link
                key={message._id!.toString()}
                href={`/admin/messages/${message._id!.toString()}/edit`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-border bg-card px-6 py-4 transition-colors hover:border-border-strong"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">{message.name}</span>
                  <span className="font-mono text-[12px] text-muted-foreground">{message.email}</span>
                </span>
                <StatusPill tone={message.read ? "neutral" : "status"} label={message.read ? "Read" : "New"} />
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mt-16 max-w-[520px]">
        <Eyebrow number="03" label="ACCOUNT" dot="client" />
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </section>
    </>
  )
}
