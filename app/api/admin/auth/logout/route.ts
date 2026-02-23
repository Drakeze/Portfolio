import { successResponse } from "@/lib/api/responses"
import { clearAdminSessionCookie } from "@/lib/auth/admin"

export async function POST() {
  await clearAdminSessionCookie()
  return successResponse({ authenticated: false })
}
