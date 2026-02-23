import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createSkill, listSkills } from "@/lib/domains/skills/service"
import { skillInputSchema } from "@/lib/domains/skills/validators"

export async function GET() {
  try {
    return successResponse(await listSkills())
  } catch {
    return errorResponse("Failed to fetch skills", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = skillInputSchema.parse(await request.json())
    return successResponse(await createSkill(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    return errorResponse("Failed to create skill", 500)
  }
}
