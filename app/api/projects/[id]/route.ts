import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteProject, getProjectById, getProjectBySlug, updateProject } from "@/lib/domains/projects/service"
import { projectUpdateSchema } from "@/lib/domains/projects/validators"

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

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    if (!ObjectId.isValid(id)) {
      return errorResponse("Invalid project id")
    }

    const input = projectUpdateSchema.parse(await request.json())

    if (input.slug) {
      const existing = await getProjectBySlug(input.slug)
      if (existing && existing._id?.toString() !== id) {
        return errorResponse("A project with this slug already exists", 409)
      }
    }

    const project = await updateProject(id, input)
    if (!project) {
      return errorResponse("Project not found", 404)
    }

    return successResponse(project)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid project payload")
    }

    return errorResponse("Failed to update project", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid project id")
  }

  const project = await deleteProject(id)
  if (!project) {
    return errorResponse("Project not found", 404)
  }

  return successResponse(project)
}
