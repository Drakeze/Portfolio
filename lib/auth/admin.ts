import { cookies } from "next/headers"

import { ADMIN_SESSION_COOKIE_NAME, validateAdminSessionToken } from "@/src/lib/admin-session"

export async function requireAdmin() {
  const cookieStore = await cookies()
  const hasSession = await validateAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value)

  if (!hasSession) {
    throw new Error("Not authenticated")
  }

  return { role: "admin" as const }
}

export async function isAdmin() {
  try {
    await requireAdmin()
    return true
  } catch {
    return false
  }
}
