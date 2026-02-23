import { errorResponse, successResponse } from "@/lib/api/responses"
import { getAdminPassword, setAdminSessionCookie } from "@/lib/auth/admin"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string }

    if (!body.password || body.password !== getAdminPassword()) {
      return errorResponse("Invalid password", 401)
    }

    await setAdminSessionCookie()
    return successResponse({ authenticated: true })
  } catch {
    return errorResponse("Unable to login", 500)
  }
}
