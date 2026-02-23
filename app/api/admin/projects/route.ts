import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createProject, listProjects } from "@/lib/domains/projects/service"
import { projectInputSchema } from "@/lib/domains/projects/validators"

export async function GET() {
  try {
    const data = await listProjects()
    return successResponse(data)
  } catch {
    return errorResponse("Failed to fetch projects", 500)
  }
}

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
