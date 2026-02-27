import Link from "next/link"
import { revalidatePath } from "next/cache"

import {
  createCertification,
  deleteCertification,
  listCertifications,
  updateCertification,
} from "@/lib/domains/certifications/service"

export const dynamic = "force-dynamic"

async function createCertificationAction(formData: FormData) {
  "use server"

  const title = String(formData.get("title") ?? "").trim()
  const completedValue = String(formData.get("completed") ?? "true")
  const grade = String(formData.get("grade") ?? "").trim()

  if (!title) {
    return
  }

  await createCertification({
    title,
    completed: completedValue === "true",
    grade: grade || undefined,
  })

  revalidatePath("/admin/certifications")
  revalidatePath("/about")
}

async function toggleCertificationAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  const completedValue = String(formData.get("completed") ?? "")

  if (!id || (completedValue !== "true" && completedValue !== "false")) {
    return
  }

  await updateCertification(id, { completed: completedValue === "true" })

  revalidatePath("/admin/certifications")
  revalidatePath("/about")
}

async function deleteCertificationAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    return
  }

  await deleteCertification(id)

  revalidatePath("/admin/certifications")
  revalidatePath("/about")
}

export default async function AdminCertificationsPage() {
  const certifications = await listCertifications()

  return (
    <main className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Certifications</h1>
        <p className="text-sm text-muted-foreground">Create new certifications or manage existing ones.</p>
      </section>

      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">Create New Certification</h2>

        <form action={createCertificationAction} className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="cert-title">
              Certification Name
            </label>
            <input
              id="cert-title"
              name="title"
              type="text"
              required
              placeholder="Introduction to Software Engineering"
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
              defaultValue="true"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="true">Completed</option>
              <option value="false">In Progress</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="cert-grade">
              Grade
            </label>
            <input
              id="cert-grade"
              name="grade"
              type="text"
              placeholder="86%"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90" type="submit">
              Save Certification
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Certifications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Completed</th>
                <th className="px-6 py-3">Grade</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert._id.toString()} className="border-t hover:bg-muted/30">
                  <td className="px-6 py-4 font-mono text-xs">{cert._id.toString().slice(-6)}</td>
                  <td className="px-6 py-4">{cert.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        cert.completed === false
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {cert.completed === false ? "In Progress" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{cert.grade ?? "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-4">
                      <Link href={`/admin/certifications/${cert._id.toString()}/edit`} className="text-sm font-medium text-primary hover:underline">
                        Edit
                      </Link>

                      <form action={toggleCertificationAction}>
                        <input type="hidden" name="id" value={cert._id.toString()} />
                        <input
                          type="hidden"
                          name="completed"
                          value={cert.completed === false ? "true" : "false"}
                        />
                        <button className="text-sm font-medium text-yellow-600 hover:underline" type="submit">
                          {cert.completed === false ? "Mark Complete" : "Mark In Progress"}
                        </button>
                      </form>

                      <form action={deleteCertificationAction}>
                        <input type="hidden" name="id" value={cert._id.toString()} />
                        <button className="text-sm font-medium text-red-600 hover:underline" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
