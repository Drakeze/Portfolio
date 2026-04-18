import { ObjectId } from "mongodb"

import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { getSkillById } from "@/lib/domains/skills/service"

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

export async function PATCH() {
  return methodNotAllowedResponse(["GET"])
}

export async function DELETE() {
  return methodNotAllowedResponse(["GET"])
}
