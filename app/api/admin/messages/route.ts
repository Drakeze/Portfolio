import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage, listMessages } from "@/lib/domains/messages/service"
import { messageInputSchema } from "@/lib/domains/messages/validators"

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
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid message payload")
    return errorResponse("Failed to create message", 500)
  }
}
