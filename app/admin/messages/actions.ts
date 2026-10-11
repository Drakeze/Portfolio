"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { deleteMessage, updateMessage } from "@/lib/domains/messages/service"

export const toggleMessageReadAction = adminAction(async (formData) => {
  const id = String(formData.get("id") ?? "")
  const read = formData.get("read") === "true"

  const updated = await updateMessage(id, { read })
  if (!updated) return { ok: false, error: "That message no longer exists." }

  revalidatePath("/admin/messages")
  revalidatePath("/admin")
  return { ok: true }
})

export const deleteMessageAction = adminAction(async (formData) => {
  const deleted = await deleteMessage(String(formData.get("id") ?? ""))
  if (!deleted) return { ok: false, error: "That message no longer exists." }

  revalidatePath("/admin/messages")
  revalidatePath("/admin")
  return { ok: true, redirectTo: "/admin/messages" }
})
