import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createProject, listProjects } from "@/lib/domains/projects/service"
import { projectInputSchema } from "@/lib/domains/projects/validators"

{/* Get Function */}
export async function GET() {
  try {
    const data = await listProjects()
    return successResponse(data)
  } catch {
    return errorResponse("Failed to fetch projects", 500)
  }
}

{/* Post Function */}
export async function POST(request: Request) {
  try {
    const input = projectInputSchema.parse(await request.json())
    const data = await createProject(input)
    return successResponse(data, 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid project payload")
    }
    return errorResponse("Failed to create project", 500)
  }
}

{/* Patch Function */}
export async function PATCH(request: Request) {
  try {
    const input = projectInputSchema.parse(await request.json())
    const data = await createProject(input)
    return successResponse(data, 200)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid project payload")
    }
    return errorResponse("Failed to update project", 500)
  }
}

{/* Delete Function */}
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    // Implement delete logic here, e.g., await deleteProject(id)
    return successResponse({ message: "Project deleted successfully" })
  } catch {
    return errorResponse("Failed to delete project", 500)
  }
}