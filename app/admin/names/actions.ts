"use server"

import { revalidatePath } from "next/cache"

import { adminAction } from "@/lib/admin/action"
import { deleteMessage, updateMessage } from "@/lib/domains/messages/service"

function revalidateNames() {
  revalidatePath("/admin/names")
  revalidatePath("/admin")
  // Approved submissions become pins on the home globe.
  revalidatePath("/")
}

export const approveNameAction = adminAction(async (formData) => {
  const updated = await updateMessage(String(formData.get("id") ?? ""), { read: true })
  if (!updated) return { ok: false, error: "That submission no longer exists." }

  revalidateNames()
  return { ok: true }
})

export const rejectNameAction = adminAction(async (formData) => {
  const deleted = await deleteMessage(String(formData.get("id") ?? ""))
  if (!deleted) return { ok: false, error: "That submission no longer exists." }

  revalidateNames()
  return { ok: true }
})
