import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  clearAdminSessionCookie,
  isValidAdminPassword,
  setAdminSessionCookie,
  updateAdminPassword,
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : ""
    const newPassword = typeof body?.newPassword === "string" ? body.newPassword : ""
    const confirmPassword = typeof body?.confirmPassword === "string" ? body.confirmPassword : ""

    if (!currentPassword || !newPassword || !confirmPassword) {
      return errorResponse("Current password, new password, and confirmation are required.")
    }

    const isValidPassword = await isValidAdminPassword(currentPassword)
    if (!isValidPassword) {
      return errorResponse("Current password is incorrect.", 401)
    }

    if (newPassword !== confirmPassword) {
      return errorResponse("New password and confirmation do not match.")
    }

    if (currentPassword === newPassword) {
      return errorResponse("New password must be different from the current password.")
    }

    await updateAdminPassword(newPassword)

    const response = successResponse({ passwordUpdated: true })
    await setAdminSessionCookie(response)
    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update password."

    return errorResponse(message, 500)
  }
}
