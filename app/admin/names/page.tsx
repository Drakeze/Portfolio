import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { listNameSubmissions } from "@/lib/domains/messages/service"

import { approveNameAction, rejectNameAction } from "./actions"

export default async function AdminNamesPage() {
  const submissions = await listNameSubmissions()

  const rows = submissions.map((submission) => ({
    id: submission._id!.toString(),
    name: submission.name,
    email: submission.email,
    submitted: new Date(submission.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    approved: submission.read,
    coords:
      typeof submission.lat === "number" && typeof submission.lng === "number"
        ? `${submission.lat.toFixed(1)}, ${submission.lng.toFixed(1)}`
        : "—",
  }))

  const pending = rows.filter((row) => !row.approved).length

  return (
    <>
      <PageHeader
        number="06"
        eyebrow="GLOBE"
        dot="product"
        plain="Signed the "
        accent="globe"
        description={
          pending > 0
            ? `${pending} awaiting approval. Approved names appear as pins on the home globe.`
            : "Approved names appear as pins on the home globe."
        }
      />

      <DataTable
        rows={rows}
        columns={[
          { header: "Name", cell: (row) => <span className="font-medium text-foreground">{row.name}</span> },
          { header: "Email", cell: (row) => <span className="text-muted-foreground">{row.email}</span> },
          { header: "Position", cell: (row) => row.coords, mono: true },
          { header: "Submitted", cell: (row) => row.submitted, mono: true },
          {
            header: "Status",
            cell: (row) =>
              row.approved ? <StatusPill tone="status" label="On globe" /> : <StatusPill tone="tool" label="Pending" />,
          },
        ]}
        actions={[
          {
            label: "Approve",
            pendingLabel: "Approving...",
            action: approveNameAction,
            values: (row) => ({ id: row.id }),
          },
          {
            label: "Reject",
            tone: "danger",
            action: rejectNameAction,
            values: (row) => ({ id: row.id }),
            confirm: (row) => ({
              title: `Reject ${row.name}?`,
              description: "This deletes the submission. It cannot be undone.",
            }),
          },
        ]}
        empty={{ message: "Nobody has signed the globe yet." }}
      />
    </>
  )
}
