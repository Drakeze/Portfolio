"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { valuesFrom, zodErrors } from "@/lib/admin/fields"
import {
  createCertification,
  deleteCertification,
  updateCertification,
} from "@/lib/domains/certifications/service"
import { certificationInputSchema } from "@/lib/domains/certifications/validators"

import { certificationFields } from "./form"

const certificationEditSchema = certificationInputSchema.partial().required({ title: true })

function revalidateCertifications() {
  revalidatePath("/admin/certifications")
  revalidatePath("/about")
}

export const createCertificationAction = adminAction(async (formData) => {
  const parsed = certificationInputSchema.safeParse(valuesFrom(certificationFields, formData))
  if (!parsed.success) return zodErrors(parsed.error)

  await createCertification(parsed.data)
  revalidateCertifications()
  return { ok: true, redirectTo: "/admin/certifications" }
})

export const updateCertificationAction = adminAction(async (formData) => {
  const parsed = certificationEditSchema.safeParse(valuesFrom(certificationFields, formData))
  if (!parsed.success) return zodErrors(parsed.error)

  const updated = await updateCertification(String(formData.get("id") ?? ""), parsed.data)
  if (!updated) return { ok: false, error: "That certification no longer exists." }

  revalidateCertifications()
  return { ok: true, redirectTo: "/admin/certifications" }
})

export const deleteCertificationAction = adminAction(async (formData) => {
  const deleted = await deleteCertification(String(formData.get("id") ?? ""))
  if (!deleted) return { ok: false, error: "That certification no longer exists." }

  revalidateCertifications()
  return { ok: true }
})
