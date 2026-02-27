import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage, deleteMessage, listMessages, updateMessage } from "@/lib/domains/messages/service"
import { messageInputSchema, messageUpdateSchema } from "@/lib/domains/messages/validators"

export async function GET() {
  try {
    return successResponse(await listMessages())
  } catch {
    return errorResponse("Failed to fetch messages", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = messageInputSchema.parse(await request.json())
    return successResponse(await createMessage(input), 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid message payload")
    }

    return errorResponse("Failed to create message", 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...payload } = await request.json()

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid message id")
    }

    const input = messageUpdateSchema.parse(payload)
    const message = await updateMessage(id, input)

    if (!message) {
      return errorResponse("Message not found", 404)
    }

    return successResponse(message)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid message payload")
    }

    return errorResponse("Failed to update message", 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid message id")
    }

    const message = await deleteMessage(id)
    if (!message) {
      return errorResponse("Message not found", 404)
    }

    return successResponse(message)
  } catch {
    return errorResponse("Failed to delete message", 500)
  }
}
