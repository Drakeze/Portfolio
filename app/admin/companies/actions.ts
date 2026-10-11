"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { valuesFrom, zodErrors } from "@/lib/admin/fields"
import { createCompany, deleteCompany, getCompanyById, updateCompany } from "@/lib/domains/companies/service"
import { companyInputSchema } from "@/lib/domains/companies/validators"
import { slugify } from "@/lib/utils"

import { companyFields } from "./form"

const companyEditSchema = companyInputSchema
  .partial()
  .required({ title: true, slug: true, tagline: true, longDescription: true })

function revalidateCompanies(slug?: string) {
  revalidatePath("/admin/companies")
  revalidatePath("/work")
  if (slug) revalidatePath(`/projects/company/${slug}`)
}

function withSlug(values: Record<string, unknown>) {
  const slug = String(values.slug ?? "") || String(values.title ?? "")
  return { ...values, slug: slugify(slug) || undefined }
}

export const createCompanyAction = adminAction(async (formData) => {
  const parsed = companyInputSchema.safeParse(withSlug(valuesFrom(companyFields, formData)))
  if (!parsed.success) return zodErrors(parsed.error)

  await createCompany(parsed.data)
  revalidateCompanies(parsed.data.slug)
  return { ok: true, redirectTo: "/admin/companies" }
})

export const updateCompanyAction = adminAction(async (formData) => {
  const parsed = companyEditSchema.safeParse(withSlug(valuesFrom(companyFields, formData)))
  if (!parsed.success) return zodErrors(parsed.error)

  const id = String(formData.get("id") ?? "")
  const previous = await getCompanyById(id)
  const updated = await updateCompany(id, parsed.data)
  if (!updated) return { ok: false, error: "That company no longer exists." }

  revalidateCompanies(parsed.data.slug)
  if (previous && previous.slug !== parsed.data.slug) revalidateCompanies(previous.slug)
  return { ok: true, redirectTo: "/admin/companies" }
})

export const deleteCompanyAction = adminAction(async (formData) => {
  const id = String(formData.get("id") ?? "")
  const previous = await getCompanyById(id)
  const deleted = await deleteCompany(id)
  if (!deleted) return { ok: false, error: "That company no longer exists." }

  revalidateCompanies(previous?.slug)
  return { ok: true }
})
