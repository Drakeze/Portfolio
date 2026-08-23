import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { ActionToast } from "@/components/admin/action-toast"
import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { ConfirmSubmitButton, SubmitButton } from "@/components/admin/form-actions"
import { deleteMessage, listMessages, updateMessage } from "@/lib/domains/messages/service"

export const dynamic = "force-dynamic"

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

async function toggleMessageReadAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  const readValue = String(formData.get("read") ?? "")

  if (!id || (readValue !== "true" && readValue !== "false")) {
    redirect("/admin/messages?status=error&message=Invalid+message+action")
  }

  try {
    await updateMessage(id, { read: readValue === "true" })
  } catch {
    redirect("/admin/messages?status=error&message=Failed+to+update+message")
  }

  revalidatePath("/admin/messages")
  redirect("/admin/messages?status=success&message=Message+updated")
}

async function deleteMessageAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/messages?status=error&message=Missing+message+id")
  }

  try {
    await deleteMessage(id)
  } catch {
    redirect("/admin/messages?status=error&message=Failed+to+delete+message")
  }

  revalidatePath("/admin/messages")
  redirect("/admin/messages?status=success&message=Message+deleted")
}

export default async function AdminMessagesPage({ searchParams }: PageProps) {
  const messages = await listMessages()
  const { status, message } = await searchParams

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground">View and manage incoming emails.</p>
      </section>

      <ActionToast status={status} message={message} />
      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Inbox</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Read</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id.toString()} className={`border-t hover:bg-muted/30 ${msg.read ? "opacity-60" : ""}`}>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${msg.read ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}`}>
                      {msg.read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{msg.name}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="max-w-xs truncate px-6 py-4">{msg.message}</td>
                  <td className="px-6 py-4">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/messages/${msg._id.toString()}/edit`} className="text-sm font-medium text-primary hover:underline">
                        View
                      </Link>

                      <form action={toggleMessageReadAction}>
                        <input type="hidden" name="id" value={msg._id.toString()} />
                        <input type="hidden" name="read" value={msg.read ? "false" : "true"} />
                        <SubmitButton
                          label={msg.read ? "Mark Unread" : "Mark Read"}
                          pendingLabel="Updating..."
                          className="text-sm font-medium text-yellow-600 hover:underline disabled:opacity-60"
                        />
                      </form>

                      <form action={deleteMessageAction}>
                        <input type="hidden" name="id" value={msg._id.toString()} />
                        <ConfirmSubmitButton
                          label="Delete"
                          pendingLabel="Deleting..."
                          confirmMessage="Delete this message? This cannot be undone."
                          className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
                        />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    No messages yet. New contact submissions will appear here once someone reaches out.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
