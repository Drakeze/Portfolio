"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { valuesFrom, zodErrors } from "@/lib/admin/fields"
import { createSkill, deleteSkill, updateSkill } from "@/lib/domains/skills/service"
import { skillInputSchema } from "@/lib/domains/skills/validators"

import { skillFields } from "./form"

const skillEditSchema = skillInputSchema.partial().required({ name: true })

function revalidateSkills() {
  revalidatePath("/admin/skills")
  revalidatePath("/about")
}

export const createSkillAction = adminAction(async (formData) => {
  const parsed = skillInputSchema.safeParse(valuesFrom(skillFields, formData))
  if (!parsed.success) return zodErrors(parsed.error)

  await createSkill(parsed.data)
  revalidateSkills()
  return { ok: true, redirectTo: "/admin/skills" }
})

export const updateSkillAction = adminAction(async (formData) => {
  const parsed = skillEditSchema.safeParse(valuesFrom(skillFields, formData))
  if (!parsed.success) return zodErrors(parsed.error)

  const updated = await updateSkill(String(formData.get("id") ?? ""), parsed.data)
  if (!updated) return { ok: false, error: "That skill no longer exists." }

  revalidateSkills()
  return { ok: true, redirectTo: "/admin/skills" }
})

export const deleteSkillAction = adminAction(async (formData) => {
  const deleted = await deleteSkill(String(formData.get("id") ?? ""))
  if (!deleted) return { ok: false, error: "That skill no longer exists." }

  revalidateSkills()
  return { ok: true }
})
