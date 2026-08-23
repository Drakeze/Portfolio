import { ZodError, z } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage } from "@/lib/domains/messages/service"
import { createRateLimiter } from "@/lib/rate-limit"

const globeJoinSchema = z.object({
  name: z.string().min(1).max(60),
})

const isRateLimited = createRateLimiter(5, 10 * 60 * 1000)

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
      return errorResponse("Too many submissions sent. Please try again later.", 429)
    }

    const { name } = globeJoinSchema.parse(await req.json())

    const savedMessage = await createMessage({
      name,
      email: "",
      message: "Wants to join the globe.",
      read: false,
    })

    return successResponse({ messageId: savedMessage._id }, 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid submission")
    }

    return errorResponse("Failed to process submission", 500)
  }
}
