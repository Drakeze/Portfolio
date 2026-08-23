import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { ActionToast } from "@/components/admin/action-toast"
import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { ConfirmSubmitButton, SubmitButton } from "@/components/admin/form-actions"
import {
  createCertification,
  deleteCertification,
  listCertifications,
  updateCertification,
} from "@/lib/domains/certifications/service"
import { createSkill, deleteSkill, listSkills, updateSkill } from "@/lib/domains/skills/service"
import type { SkillStatus } from "@/lib/domains/skills/types"

export const dynamic = "force-dynamic"

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

async function createSkillAction(formData: FormData) {
  "use server"

  const name = String(formData.get("name") ?? "").trim()
  const statusValue = String(formData.get("status") ?? "active") as SkillStatus
  const category = String(formData.get("category") ?? "").trim()
  const experienceDuration = String(formData.get("experienceDuration") ?? "").trim()
  const icon = String(formData.get("icon") ?? "").trim()
  const blurb = String(formData.get("blurb") ?? "").trim()

  if (!name) {
    redirect("/admin/workshop?status=error&message=Skill+name+is+required")
  }

  const status: SkillStatus = statusValue === "learning" || statusValue === "archived" ? statusValue : "active"

  await createSkill({
    name,
    status,
    category: category || undefined,
    experienceDuration: experienceDuration || undefined,
    icon: icon || undefined,
    blurb: blurb || undefined,
  })

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Skill+created")
}

async function archiveSkillAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/workshop?status=error&message=Missing+skill+id")
  }

  await updateSkill(id, { status: "archived" })

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Skill+archived")
}

async function deleteSkillAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/workshop?status=error&message=Missing+skill+id")
  }

  await deleteSkill(id)

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Skill+deleted")
}

async function createCertificationAction(formData: FormData) {
  "use server"

  const title = String(formData.get("title") ?? "").trim()
  const completedValue = String(formData.get("completed") ?? "true")
  const grade = String(formData.get("grade") ?? "").trim()

  if (!title) {
    redirect("/admin/workshop?status=error&message=Certification+title+is+required")
  }

  await createCertification({
    title,
    completed: completedValue === "true",
    grade: grade || undefined,
  })

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Certification+created")
}

async function toggleCertificationAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  const completedValue = String(formData.get("completed") ?? "")

  if (!id || (completedValue !== "true" && completedValue !== "false")) {
    redirect("/admin/workshop?status=error&message=Invalid+certification+action")
  }

  await updateCertification(id, { completed: completedValue === "true" })

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Certification+updated")
}

async function deleteCertificationAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/workshop?status=error&message=Missing+certification+id")
  }

  await deleteCertification(id)

  revalidatePath("/admin/workshop")
  revalidatePath("/about")
  redirect("/admin/workshop?status=success&message=Certification+deleted")
}

function getStatusStyles(status: SkillStatus) {
  if (status === "active") return "bg-green-100 text-green-700"
  if (status === "learning") return "bg-blue-100 text-blue-700"
  return "bg-yellow-100 text-yellow-700"
}

export default async function AdminWorkshopPage({ searchParams }: PageProps) {
  const [skills, certifications] = await Promise.all([listSkills(), listCertifications()])
  const { status, message } = await searchParams
  const existingCategories = [...new Set(skills.map((skill) => skill.category).filter(Boolean))] as string[]

  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Workshop</h1>
        <p className="text-sm text-muted-foreground">Manage the skills and certifications shown in the About page Workshop section.</p>
      </section>

      <ActionToast status={status} message={message} />
      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>

        <div className="rounded-lg border bg-background p-6">
          <h3 className="mb-6 text-sm font-medium">Create New Skill</h3>

          <form action={createSkillAction} className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-name">
                Skill Name
              </label>
              <input
                id="skill-name"
                name="name"
                type="text"
                required
                placeholder="React"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-status">
                Status
              </label>
              <select
                id="skill-status"
                name="status"
                defaultValue="active"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="active">Active</option>
                <option value="learning">Learning</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-category">
                Category (Workshop folder)
              </label>
              <input
                id="skill-category"
                name="category"
                type="text"
                list="skill-categories"
                placeholder="Frontend"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <datalist id="skill-categories">
                {existingCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-duration">
                Time Used
              </label>
              <input
                id="skill-duration"
                name="experienceDuration"
                type="text"
                placeholder="2 years"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-icon">
                Icon Key
              </label>
              <input
                id="skill-icon"
                name="icon"
                type="text"
                placeholder="react"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-blurb">
                Blurb
              </label>
              <input
                id="skill-blurb"
                name="blurb"
                type="text"
                placeholder="My daily driver."
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="flex items-end">
              <SubmitButton label="Save Skill" pendingLabel="Saving..." className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60" />
            </div>
          </form>
        </div>

        <div className="rounded-lg border bg-background">
          <div className="border-b p-6">
            <h3 className="text-sm font-medium">Existing Skills</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Skill Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Time Used</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => {
                  const status = skill.status ?? "active"

                  return (
                    <tr key={skill._id.toString()} className="border-t hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-xs">{skill._id.toString().slice(-6)}</td>
                      <td className="px-6 py-4">{skill.name}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(status)}`}>{status}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{skill.category ?? "—"}</td>
                      <td className="px-6 py-4 text-muted-foreground">{skill.experienceDuration ?? "—"}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-4">
                          <Link href={`/admin/skills/${skill._id.toString()}/edit`} className="text-sm font-medium text-primary hover:underline">
                            Edit
                          </Link>

                          {status !== "archived" ? (
                            <form action={archiveSkillAction}>
                              <input type="hidden" name="id" value={skill._id.toString()} />
                              <SubmitButton label="Archive" pendingLabel="Archiving..." className="text-sm font-medium text-yellow-600 hover:underline disabled:opacity-60" />
                            </form>
                          ) : null}

                          <form action={deleteSkillAction}>
                            <input type="hidden" name="id" value={skill._id.toString()} />
                            <ConfirmSubmitButton label="Delete" pendingLabel="Deleting..." confirmMessage="Delete this skill? This cannot be undone." className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60" />
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Certifications</h2>

        <div className="rounded-lg border bg-background p-6">
          <h3 className="mb-6 text-sm font-medium">Create New Certification</h3>

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
              <SubmitButton label="Save Certification" pendingLabel="Saving..." className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60" />
            </div>
          </form>
        </div>

        <div className="rounded-lg border bg-background">
          <div className="border-b p-6">
            <h3 className="text-sm font-medium">Existing Certifications</h3>
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
                          cert.completed === false ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
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
                          <input type="hidden" name="completed" value={cert.completed === false ? "true" : "false"} />
                          <SubmitButton label={cert.completed === false ? "Mark Complete" : "Mark In Progress"} pendingLabel="Updating..." className="text-sm font-medium text-yellow-600 hover:underline disabled:opacity-60" />
                        </form>

                        <form action={deleteCertificationAction}>
                          <input type="hidden" name="id" value={cert._id.toString()} />
                          <ConfirmSubmitButton label="Delete" pendingLabel="Deleting..." confirmMessage="Delete this certification? This cannot be undone." className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60" />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
