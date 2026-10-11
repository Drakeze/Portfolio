import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { listCompanies } from "@/lib/domains/companies/service"

import { deleteCompanyAction } from "./actions"

export default async function AdminCompaniesPage() {
  const companies = await listCompanies()

  const rows = companies.map((company) => ({
    id: company._id!.toString(),
    title: company.title,
    slug: company.slug,
    tagline: company.tagline,
    images: company.gallery.length,
  }))

  return (
    <>
      <PageHeader
        number="02"
        eyebrow="COMPANIES"
        dot="client"
        plain="Client "
        accent="work"
        description="Companies shown on the work page's Companies tab."
        action={{ label: "Add company", href: "/admin/companies/create" }}
      />

      <DataTable
        rows={rows}
        editHref={(row) => `/admin/companies/${row.id}/edit`}
        columns={[
          { header: "Company", cell: (row) => <span className="font-medium text-foreground">{row.title}</span> },
          { header: "Slug", cell: (row) => row.slug, mono: true },
          { header: "Tagline", cell: (row) => <span className="text-muted-foreground">{row.tagline}</span> },
          { header: "Images", cell: (row) => row.images, align: "right" },
        ]}
        actions={[
          {
            label: "Delete",
            tone: "danger",
            action: deleteCompanyAction,
            values: (row) => ({ id: row.id }),
            confirm: (row) => ({
              title: `Delete “${row.title}”?`,
              description: "This removes the company and its detail page. It cannot be undone.",
            }),
          },
        ]}
        empty={{ message: "No companies yet.", cta: { label: "Add your first company", href: "/admin/companies/create" } }}
      />
    </>
  )
}
