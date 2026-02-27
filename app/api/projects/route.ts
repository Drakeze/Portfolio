import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  listProjects,
  updateProject,
} from "@/lib/domains/projects/service"
import { projectInputSchema, projectUpdateSchema } from "@/lib/domains/projects/validators"

export async function GET() {
  try {
    return successResponse(await listProjects())
  } catch {
    return errorResponse("Failed to fetch projects", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = projectInputSchema.parse(await request.json())
    const existing = await getProjectBySlug(input.slug)

    if (existing) {
      return errorResponse("A project with this slug already exists", 409)
    }

    return successResponse(await createProject(input), 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid project payload")
    }

    return errorResponse("Failed to create project", 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...payload } = await request.json()

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid project id")
    }

    const input = projectUpdateSchema.parse(payload)

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

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid project id")
    }

    const project = await deleteProject(id)
    if (!project) {
      return errorResponse("Project not found", 404)
    }

    return successResponse(project)
  } catch {
    return errorResponse("Failed to delete project", 500)
  }
}
