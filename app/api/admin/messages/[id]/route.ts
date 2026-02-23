import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { getMessageById, softDeleteMessage, updateMessage } from "@/lib/domains/messages/service"
import { messageUpdateSchema } from "@/lib/domains/messages/validators"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid message id")

  const data = await getMessageById(id)
  if (!data) return errorResponse("Message not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
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
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid message id")

  const data = await softDeleteMessage(id)
  if (!data) return errorResponse("Message not found", 404)

  return successResponse(data)
}
