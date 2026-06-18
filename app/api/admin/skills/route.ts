import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { createSkill, listSkills } from "@/lib/domains/skills/service"
import { skillInputSchema } from "@/lib/domains/skills/validators"

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
    return successResponse(await listSkills())
  } catch {
    return errorResponse("Failed to fetch skills", 500)
  }
}

export async function POST(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = skillInputSchema.parse(await request.json())
    return successResponse(await createSkill(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    return errorResponse("Failed to create skill", 500)
  }
}
