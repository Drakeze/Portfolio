"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { valuesFrom, zodErrors } from "@/lib/admin/fields"
import { createProject, deleteProject, updateProject } from "@/lib/domains/projects/service"
import { projectInputSchema } from "@/lib/domains/projects/validators"
import { slugify } from "@/lib/utils"

import { projectFields } from "./form"

// Not projectUpdateSchema: that is fully .partial(), so blanking a required
// field parsed clean and was then silently dropped from the update.
const projectEditSchema = projectInputSchema
  .partial()
  .required({ title: true, slug: true, description: true, image: true })

function revalidateProjects() {
  revalidatePath("/admin/projects")
  revalidatePath("/work")
  revalidatePath("/")
}

function withSlug(values: Record<string, unknown>) {
  const slug = String(values.slug ?? "") || String(values.title ?? "")
  return { ...values, slug: slugify(slug) || undefined }
}

export const createProjectAction = adminAction(async (formData) => {
  const parsed = projectInputSchema.safeParse(withSlug(valuesFrom(projectFields, formData)))
  if (!parsed.success) return zodErrors(parsed.error)

  await createProject(parsed.data)
  revalidateProjects()
  return { ok: true, redirectTo: "/admin/projects" }
})

export const updateProjectAction = adminAction(async (formData) => {
  const parsed = projectEditSchema.safeParse(withSlug(valuesFrom(projectFields, formData)))
  if (!parsed.success) return zodErrors(parsed.error)

  const updated = await updateProject(String(formData.get("id") ?? ""), parsed.data)
  if (!updated) return { ok: false, error: "That project no longer exists." }

  revalidateProjects()
  return { ok: true, redirectTo: "/admin/projects" }
})

export const deleteProjectAction = adminAction(async (formData) => {
  const deleted = await deleteProject(String(formData.get("id") ?? ""))
  if (!deleted) return { ok: false, error: "That project no longer exists." }

  revalidateProjects()
  return { ok: true }
})
