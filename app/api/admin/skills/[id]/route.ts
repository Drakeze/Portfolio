import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteSkill, getSkillById, updateSkill } from "@/lib/domains/skills/service"
import { skillUpdateSchema } from "@/lib/domains/skills/validators"

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
  if (!ObjectId.isValid(id)) return errorResponse("Invalid skill id")

  const data = await getSkillById(id)
  if (!data) return errorResponse("Skill not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const { id } = await context.params
    if (!ObjectId.isValid(id)) return errorResponse("Invalid skill id")

    const input = skillUpdateSchema.parse(await request.json())
    const data = await updateSkill(id, input)
    if (!data) return errorResponse("Skill not found", 404)

    return successResponse(data)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    return errorResponse("Failed to update skill", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid skill id")

  const data = await deleteSkill(id)
  if (!data) return errorResponse("Skill not found", 404)

  return successResponse(data)
}
