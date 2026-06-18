import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteProject, getProjectById, updateProject } from "@/lib/domains/projects/service"
import { projectUpdateSchema } from "@/lib/domains/projects/validators"

type RouteContext = { params: Promise<{ id: string }> }

function isValidObjectId(id: string) {
  return ObjectId.isValid(id)
}

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
  if (!isValidObjectId(id)) return errorResponse("Invalid project id")

  const project = await getProjectById(id)
  if (!project) return errorResponse("Project not found", 404)

  return successResponse(project)
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const { id } = await context.params
    if (!isValidObjectId(id)) return errorResponse("Invalid project id")

    const input = projectUpdateSchema.parse(await request.json())
    const project = await updateProject(id, input)

    if (!project) return errorResponse("Project not found", 404)
    return successResponse(project)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid project payload")
    }
    return errorResponse("Failed to update project", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!isValidObjectId(id)) return errorResponse("Invalid project id")

  const project = await deleteProject(id)
  if (!project) return errorResponse("Project not found", 404)

  return successResponse(project)
}
