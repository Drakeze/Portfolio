import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { ActionToast } from "@/components/admin/action-toast"
import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { ConfirmSubmitButton, SubmitButton } from "@/components/admin/form-actions"
import { deleteMessage, listNameSubmissions, updateMessage } from "@/lib/domains/messages/service"

export const dynamic = "force-dynamic"

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

async function toggleApprovedAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  const readValue = String(formData.get("read") ?? "")

  if (!id || (readValue !== "true" && readValue !== "false")) {
    redirect("/admin/names?status=error&message=Invalid+name+action")
  }

  try {
    await updateMessage(id, { read: readValue === "true" })
  } catch {
    redirect("/admin/names?status=error&message=Failed+to+update+name")
  }

  revalidatePath("/admin/names")
  revalidatePath("/")
  redirect(`/admin/names?status=success&message=${readValue === "true" ? "Name+approved" : "Name+unapproved"}`)
}

async function deleteNameAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/names?status=error&message=Missing+submission+id")
  }

  try {
    await deleteMessage(id)
  } catch {
    redirect("/admin/names?status=error&message=Failed+to+reject+submission")
  }

  revalidatePath("/admin/names")
  redirect("/admin/names?status=success&message=Submission+rejected")
}

export default async function AdminNamesPage({ searchParams }: PageProps) {
  const submissions = await listNameSubmissions()
  const { status, message } = await searchParams

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Names</h1>
        <p className="text-sm text-muted-foreground">
          Visitors who asked to join the homepage globe. Approved names appear as pins on the globe; rejected ones are deleted.
        </p>
      </section>

      <ActionToast status={status} message={message} />
      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Submissions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Coordinates</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id.toString()} className={`border-t hover:bg-muted/30 ${sub.read ? "opacity-60" : ""}`}>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${sub.read ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {sub.read ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{sub.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {typeof sub.lat === "number" && typeof sub.lng === "number" ? `${sub.lat.toFixed(2)}, ${sub.lng.toFixed(2)}` : "—"}
                  </td>
                  <td className="px-6 py-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <form action={toggleApprovedAction}>
                        <input type="hidden" name="id" value={sub._id.toString()} />
                        <input type="hidden" name="read" value={sub.read ? "false" : "true"} />
                        <SubmitButton
                          label={sub.read ? "Unapprove" : "Approve"}
                          pendingLabel="Updating..."
                          className="text-sm font-medium text-green-600 hover:underline disabled:opacity-60"
                        />
                      </form>

                      <form action={deleteNameAction}>
                        <input type="hidden" name="id" value={sub._id.toString()} />
                        <ConfirmSubmitButton
                          label="Reject"
                          pendingLabel="Rejecting..."
                          confirmMessage="Reject and delete this submission? This cannot be undone."
                          className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
                        />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No submissions yet. Names people ask to add to the globe will appear here.
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
