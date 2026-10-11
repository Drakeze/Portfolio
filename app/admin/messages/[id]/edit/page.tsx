import Link from "next/link"
import { notFound } from "next/navigation"

import { RowAction } from "@/components/admin/row-action"
import { PageHeader } from "@/components/admin/shell"
import { StatusPill } from "@/components/admin/status-pill"
import { getMessageById } from "@/lib/domains/messages/service"

import { deleteMessageAction, toggleMessageReadAction } from "../../actions"

/**
 * Read-only detail. Inbound mail is not editable content, so there is no
 * EntityForm here - only the read toggle and delete.
 */
export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const message = await getMessageById(id)
  if (!message) notFound()

  const received = new Date(message.createdAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  })

  return (
    <>
      <PageHeader number="05" eyebrow="MESSAGES / DETAIL" dot="status" plain="A " accent="message" />

      <article className="flex flex-col gap-6 rounded-[14px] border border-border bg-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[17px] font-medium text-foreground">{message.name}</p>
            <Link href={`mailto:${message.email}`} className="font-mono text-[13px] text-primary underline-offset-4 hover:underline">
              {message.email}
            </Link>
          </div>
          <StatusPill tone={message.read ? "neutral" : "status"} label={message.read ? "Read" : "New"} />
        </div>

        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{received}</p>

        <hr className="border-border" />

        <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-foreground">{message.message}</p>
      </article>

      <div className="mt-8 flex items-center gap-6">
        <RowAction
          label={message.read ? "Mark unread" : "Mark read"}
          action={toggleMessageReadAction}
          values={{ id: message._id!.toString(), read: String(!message.read) }}
        />
        <RowAction
          label="Delete"
          tone="danger"
          action={deleteMessageAction}
          values={{ id: message._id!.toString() }}
          confirm={{ title: `Delete the message from ${message.name}?`, description: "This cannot be undone." }}
        />
        <Link
          href="/admin/messages"
          className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Back to inbox
        </Link>
      </div>
    </>
  )
}
