import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { listProjects } from "@/lib/domains/projects/service"

export async function GET() {
  try {
    return successResponse(await listProjects())
  } catch {
    return errorResponse("Failed to fetch projects", 500)
  }
}

export async function POST() {
  return methodNotAllowedResponse(["GET"])
}

export async function PATCH() {
  return methodNotAllowedResponse(["GET"])
}

export async function DELETE() {
  return methodNotAllowedResponse(["GET"])
}
