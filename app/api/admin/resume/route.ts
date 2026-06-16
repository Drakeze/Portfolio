import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { getResume, upsertResume } from "@/lib/domains/resume/service"
import { resumeInputSchema } from "@/lib/domains/resume/validators"

export async function GET() {
  try {
    return successResponse(await getResume())
  } catch {
    return errorResponse("Failed to fetch resume", 500)
  }
}

export async function PUT(request: Request) {
  try {
    const input = resumeInputSchema.parse(await request.json())
    const resume = await upsertResume(input)
    return successResponse(resume)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid resume payload")
    return errorResponse("Failed to save resume", 500)
  }
}
