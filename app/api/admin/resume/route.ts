import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { getResume, upsertResume } from "@/lib/domains/resume/service"
import { resumeInputSchema } from "@/lib/domains/resume/validators"

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
    return successResponse(await getResume())
  } catch {
    return errorResponse("Failed to fetch resume", 500)
  }
}

export async function PUT(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = resumeInputSchema.parse(await request.json())
    const resume = await upsertResume(input)
    return successResponse(resume)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid resume payload")
    return errorResponse("Failed to save resume", 500)
  }
}
