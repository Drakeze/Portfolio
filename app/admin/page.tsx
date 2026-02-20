import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { companies } from "@/lib/companies"
import { projects } from "@/lib/projects"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Admin - ${siteConfig.name}`,
  description: "Internal admin workspace for managing portfolio content and reviewing inbox requests.",
}

const readinessChecks = [
  { label: "Typecheck / build blockers", status: "clear", note: "No TypeScript errors after Prisma placeholder adjustment." },
  { label: "Static vs dynamic content boundaries", status: "clear", note: "Projects and company profiles remain deterministic and cache-friendly." },
  { label: "MongoDB structure planning", status: "needs-attention", note: "Finalize naming convention and collection ownership before enabling writes." },
  { label: "Admin write APIs", status: "planned", note: "UI is staged first. Add authenticated mutations after cluster cleanup." },
] as const

const inboxPreview = [
  {
    name: "Jordan @ Product Team",
    email: "jordan@example.com",
    subject: "Interested in dashboard collaboration",
    receivedAt: "2026-02-14 10:35 UTC",
    channel: "Contact form",
  },
  {
    name: "Recruiting Coordinator",
    email: "hiring@example.org",
    subject: "Frontend role follow-up",
    receivedAt: "2026-02-13 18:12 UTC",
    channel: "Contact form",
  },
]

export default function AdminPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <Badge variant="outline">Internal workspace</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Portfolio admin console</h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            This page gives you one place to review deployment readiness and prep CRUD operations for projects,
            companies, and centralized contact messages.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {readinessChecks.map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  {item.label}
                  <Badge
                    variant={item.status === "clear" ? "default" : "secondary"}
                    className={item.status === "needs-attention" ? "bg-amber-500/20 text-amber-700" : undefined}
                  >
                    {item.status}
                  </Badge>
                </CardTitle>
                <CardDescription>{item.note}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Projects manager</CardTitle>
              <CardDescription>
                Stage project updates here first, then wire these controls to authenticated API mutations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.title}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm" variant="outline" disabled>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" disabled>
                          Archive
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid gap-3">
                <Input placeholder="New project title" aria-label="New project title" />
                <Textarea placeholder="Short project summary" aria-label="Short project summary" />
                <Button className="w-fit" disabled>
                  Add project (API coming next)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Companies manager</CardTitle>
              <CardDescription>
                Keep company records stable, but retain controls for future launches or archival updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.slug}>
                      <TableCell className="font-medium">{company.title}</TableCell>
                      <TableCell className="text-muted-foreground">{company.slug}</TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm" variant="outline" disabled>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" disabled>
                          Hide
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid gap-3">
                <Input placeholder="New company name" aria-label="New company name" />
                <Textarea placeholder="One-line company summary" aria-label="One-line company summary" />
                <Button className="w-fit" disabled>
                  Add company (API coming next)
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Centralized contact inbox (UI draft)</CardTitle>
              <CardDescription>
                This keeps form submissions visible in one place while you phase in database-backed email history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inboxPreview.map((message) => (
                    <TableRow key={`${message.email}-${message.receivedAt}`}>
                      <TableCell>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-xs text-muted-foreground">{message.email}</div>
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.receivedAt}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{message.channel}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
