import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  clearAdminSessionCookie,
  isValidAdminPassword,
  setAdminSessionCookie,
} from "@/src/lib/admin-session"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = typeof body?.password === "string" ? body.password : ""

    if (!password) {
      return errorResponse("Admin password is required.")
    }

    const isValidPassword = await isValidAdminPassword(password)

    if (!isValidPassword) {
      return errorResponse("Invalid admin password.", 401)
    }

    const response = successResponse({ authenticated: true })
    await setAdminSessionCookie(response)

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign in."

    return errorResponse(message, 500)
  }
}

export async function DELETE() {
  const response = successResponse({ authenticated: false })

  clearAdminSessionCookie(response)

  return response
}
