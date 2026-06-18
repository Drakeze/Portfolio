import { headers } from "next/headers"

import { auth } from "@/lib/auth"

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    throw new Error("Not authenticated")
  }

  return session
}

export async function isAdmin() {
  try {
    await requireAdmin()
    return true
  } catch {
    return false
  }
}
