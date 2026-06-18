import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteMessage, getMessageById, updateMessage } from "@/lib/domains/messages/service"
import { messageUpdateSchema } from "@/lib/domains/messages/validators"

type RouteContext = { params: Promise<{ id: string }> }

async function authGuard() {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }
  return null
}

export async function GET(_: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid message id")

  const data = await getMessageById(id)
  if (!data) return errorResponse("Message not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const { id } = await context.params
    if (!ObjectId.isValid(id)) return errorResponse("Invalid message id")

    const input = messageUpdateSchema.parse(await request.json())
    const data = await updateMessage(id, input)
    if (!data) return errorResponse("Message not found", 404)

    return successResponse(data)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid message payload")
    return errorResponse("Failed to update message", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid message id")

  const data = await deleteMessage(id)
  if (!data) return errorResponse("Message not found", 404)

  return successResponse(data)
}
