import Link from "next/link"
import { revalidatePath } from "next/cache"
import { ObjectId } from "mongodb"
import { notFound, redirect } from "next/navigation"

import { ConfirmSubmitButton, SubmitButton } from "@/components/admin/form-actions"
import { deleteMessage, getMessageById, updateMessage } from "@/lib/domains/messages/service"

export const dynamic = "force-dynamic"

type EditMessagePageProps = { params: Promise<{ id: string }> }

export default async function EditMessagePage({ params }: EditMessagePageProps) {
  const { id } = await params

  if (!ObjectId.isValid(id)) {
    notFound()
  }

  const message = await getMessageById(id)

  if (!message) {
    notFound()
  }

  async function toggleReadAction(formData: FormData) {
    "use server"

    const nextRead = String(formData.get("read") ?? "")
    if (nextRead !== "true" && nextRead !== "false") {
      return
    }

    await updateMessage(id, { read: nextRead === "true" })

    revalidatePath("/admin/messages")
    revalidatePath(`/admin/messages/${id}/edit`)
    redirect(`/admin/messages/${id}/edit`)
  }

  async function deleteMessageAction() {
    "use server"

    await deleteMessage(id)
    revalidatePath("/admin/messages")
    redirect("/admin/messages")
  }

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Message Details</h1>
        <p className="text-sm text-muted-foreground">Read and manage this contact message.</p>
      </section>

      <section className="rounded-lg border bg-background p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p>
            <p className="mt-1 text-sm font-medium">{message.name}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
            <a className="mt-1 inline-block text-sm font-medium text-primary hover:underline" href={`mailto:${message.email}`}>
              {message.email}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Date</p>
            <p className="mt-1 text-sm font-medium">{new Date(message.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
            <span
              className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                message.read ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {message.read ? "Read" : "Unread"}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/messages" className="rounded-md border px-4 py-2 text-sm hover:bg-muted/40">
            Back
          </Link>

          <form action={toggleReadAction}>
            <input type="hidden" name="read" value={message.read ? "false" : "true"} />
            <SubmitButton label={message.read ? "Mark Unread" : "Mark Read"} pendingLabel="Updating..." className="rounded-md border border-yellow-500 px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 disabled:opacity-60" />
          </form>

          <form action={deleteMessageAction}>
            <ConfirmSubmitButton label="Delete" pendingLabel="Deleting..." confirmMessage="Delete this message? This cannot be undone." className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60" />
          </form>
        </div>
      </section>
    </main>
  )
}
