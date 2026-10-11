import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { listCertifications } from "@/lib/domains/certifications/service"

import { deleteCertificationAction } from "./actions"

export default async function AdminCertificationsPage() {
  const certifications = await listCertifications()

  const rows = certifications.map((certification) => ({
    id: certification._id!.toString(),
    title: certification.title,
    issuer: certification.issuer ?? "—",
    issued: certification.dateIssued
      ? new Date(certification.dateIssued).toLocaleDateString("en-US", { year: "numeric", month: "short" })
      : "—",
    completed: certification.completed,
  }))

  return (
    <>
      <PageHeader
        number="04"
        eyebrow="CERTIFICATIONS"
        dot="architecture"
        plain="Earned "
        accent="credentials"
        description="Certifications shown on the about page's Workshop tab."
        action={{ label: "Add certification", href: "/admin/certifications/create" }}
      />

      <DataTable
        rows={rows}
        editHref={(row) => `/admin/certifications/${row.id}/edit`}
        columns={[
          { header: "Certification", cell: (row) => <span className="font-medium text-foreground">{row.title}</span> },
          { header: "Issuer", cell: (row) => row.issuer },
          { header: "Issued", cell: (row) => row.issued, mono: true },
          {
            header: "Status",
            cell: (row) =>
              row.completed ? <StatusPill tone="status" label="Completed" /> : <StatusPill tone="tool" label="In progress" />,
          },
        ]}
        actions={[
          {
            label: "Delete",
            tone: "danger",
            action: deleteCertificationAction,
            values: (row) => ({ id: row.id }),
            confirm: (row) => ({ title: `Delete “${row.title}”?`, description: "This cannot be undone." }),
          },
        ]}
        empty={{
          message: "No certifications yet.",
          cta: { label: "Add your first certification", href: "/admin/certifications/create" },
        }}
      />
    </>
  )
}
