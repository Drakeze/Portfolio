import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { listProjects } from "@/lib/domains/projects/service"

import { deleteProjectAction } from "./actions"

type Row = {
  id: string
  title: string
  slug: string
  stack: string
  featured: boolean
}

export default async function AdminProjectsPage() {
  const projects = await listProjects()

  const rows: Row[] = projects.map((project) => ({
    id: project._id!.toString(),
    title: project.title,
    slug: project.slug,
    stack: project.techStack.join(", ") || "—",
    featured: Boolean(project.featured),
  }))

  return (
    <>
      <PageHeader
        number="01"
        eyebrow="PROJECTS"
        dot="product"
        plain="Selected "
        accent="work"
        description="Project cards shown on the public work page."
        action={{ label: "Add project", href: "/admin/projects/create" }}
      />

      <DataTable
        rows={rows}
        editHref={(row) => `/admin/projects/${row.id}/edit`}
        columns={[
          { header: "Title", cell: (row) => <span className="font-medium text-foreground">{row.title}</span> },
          { header: "Slug", cell: (row) => row.slug, mono: true },
          { header: "Stack", cell: (row) => row.stack },
          {
            header: "Status",
            cell: (row) =>
              row.featured ? <StatusPill tone="status" label="Featured" /> : <StatusPill tone="neutral" label="Standard" />,
          },
        ]}
        actions={[
          {
            label: "Delete",
            tone: "danger",
            action: deleteProjectAction,
            values: (row) => ({ id: row.id }),
            confirm: (row) => ({
              title: `Delete “${row.title}”?`,
              description: "This removes the project from your portfolio. It cannot be undone.",
            }),
          },
        ]}
        empty={{
          message: "No projects yet.",
          cta: { label: "Create your first project", href: "/admin/projects/create" },
        }}
      />
    </>
  )
}
