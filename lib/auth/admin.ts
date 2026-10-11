import { headers } from "next/headers"
import { redirect } from "next/navigation"

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

/**
 * The real write-path gate. proxy.ts only checks that a session cookie exists
 * (getSessionCookie does not verify it), so every mutating Server Action must
 * call this first. Redirects rather than throwing, so a signed-out submit lands
 * on the sign-in page instead of the error boundary.
 */
export async function guardAdmin() {
  if (!(await isAdmin())) {
    redirect("/sign-in?next=/admin")
  }
}
