import Link from "next/link"

import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { listMessages } from "@/lib/domains/messages/service"

import { toggleMessageReadAction } from "./actions"

export default async function AdminMessagesPage() {
  const messages = await listMessages()

  const rows = messages.map((message) => ({
    id: message._id!.toString(),
    name: message.name,
    email: message.email,
    received: new Date(message.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    read: message.read,
  }))

  const unread = rows.filter((row) => !row.read).length

  return (
    <>
      <PageHeader
        number="05"
        eyebrow="MESSAGES"
        dot="status"
        plain="Your "
        accent="inbox"
        description={unread > 0 ? `${unread} unread of ${rows.length}.` : `${rows.length} messages, all read.`}
      />

      <DataTable
        rows={rows}
        editHref={(row) => `/admin/messages/${row.id}/edit`}
        columns={[
          { header: "From", cell: (row) => <span className="font-medium text-foreground">{row.name}</span> },
          {
            header: "Email",
            cell: (row) => (
              <Link href={`mailto:${row.email}`} className="text-primary underline-offset-4 hover:underline">
                {row.email}
              </Link>
            ),
          },
          { header: "Received", cell: (row) => row.received, mono: true },
          {
            header: "Status",
            cell: (row) => (row.read ? <StatusPill tone="neutral" label="Read" /> : <StatusPill tone="status" label="New" />),
          },
        ]}
        actions={[
          {
            label: "Toggle read",
            action: toggleMessageReadAction,
            values: (row) => ({ id: row.id, read: String(!row.read) }),
          },
        ]}
        empty={{ message: "No messages yet. The contact form will fill this in." }}
      />
    </>
  )
}
