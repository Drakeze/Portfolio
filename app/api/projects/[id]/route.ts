import { ObjectId } from "mongodb"

import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { getProjectById } from "@/lib/domains/projects/service"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid project id")
  }

  const project = await getProjectById(id)
  if (!project) {
    return errorResponse("Project not found", 404)
  }

  return successResponse(project)
}

export async function PATCH() {
  return methodNotAllowedResponse(["GET"])
}

export async function DELETE() {
  return methodNotAllowedResponse(["GET"])
}
