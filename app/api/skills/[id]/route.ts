import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteSkill, getSkillById, updateSkill } from "@/lib/domains/skills/service"
import { skillUpdateSchema } from "@/lib/domains/skills/validators"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid skill id")
  }

  const skill = await getSkillById(id)
  if (!skill) {
    return errorResponse("Skill not found", 404)
  }

  return successResponse(skill)
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    if (!ObjectId.isValid(id)) {
      return errorResponse("Invalid skill id")
    }

    const input = skillUpdateSchema.parse(await request.json())
    const skill = await updateSkill(id, input)

    if (!skill) {
      return errorResponse("Skill not found", 404)
    }

    return successResponse(skill)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    }

    return errorResponse("Failed to update skill", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid skill id")
  }

  const skill = await deleteSkill(id)
  if (!skill) {
    return errorResponse("Skill not found", 404)
  }

  return successResponse(skill)
}
