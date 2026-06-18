import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage, listMessages } from "@/lib/domains/messages/service"
import { messageInputSchema } from "@/lib/domains/messages/validators"

async function authGuard() {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }
  return null
}

export async function GET() {
  const denied = await authGuard()
  if (denied) return denied

  try {
    return successResponse(await listMessages())
  } catch {
    return errorResponse("Failed to fetch messages", 500)
  }
}

export async function POST(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = messageInputSchema.parse(await request.json())
    return successResponse(await createMessage(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid message payload")
    return errorResponse("Failed to create message", 500)
  }
}
