import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { SubmitButton } from "@/components/admin/form-actions"
import { getCertificationById, updateCertification } from "@/lib/domains/certifications/service"

export const dynamic = "force-dynamic"

type EditCertificationPageProps = { params: Promise<{ id: string }> }

export default async function EditCertificationPage({ params }: EditCertificationPageProps) {
  const { id } = await params
  const certification = await getCertificationById(id)

  if (!certification) {
    notFound()
  }

  async function updateCertificationAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const grade = String(formData.get("grade") ?? "").trim()
    const completedValue = String(formData.get("completed") ?? "true")

    if (!title) {
      return
    }

    await updateCertification(id, {
      title,
      grade: grade || undefined,
      completed: completedValue === "true",
    })

    revalidatePath("/admin/workshop")
    revalidatePath("/about")
    redirect("/admin/workshop")
  }

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Certification</h1>
        <p className="text-sm text-muted-foreground">Update certification status and grade.</p>
      </section>

      <section className="rounded-lg border bg-background p-6">
        <form action={updateCertificationAction} className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="cert-title">
              Name
            </label>
            <input
              id="cert-title"
              name="title"
              defaultValue={certification.title}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="cert-completed">
              Completed
            </label>
            <select
              id="cert-completed"
              name="completed"
              defaultValue={certification.completed === false ? "false" : "true"}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="true">Completed</option>
              <option value="false">In Progress</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="cert-grade">
              Grade
            </label>
            <input
              id="cert-grade"
              name="grade"
              defaultValue={certification.grade ?? ""}
              placeholder="86%"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3">
            <Link href="/admin/workshop" className="rounded-md border px-4 py-2 text-sm hover:bg-muted/40">
              Cancel
            </Link>
            <SubmitButton label="Save Changes" pendingLabel="Saving..." className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60" />
          </div>
        </form>
      </section>
    </main>
  )
}
