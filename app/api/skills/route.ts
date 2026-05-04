import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { listSkills } from "@/lib/domains/skills/service"

export async function GET() {
  try {
    return successResponse(await listSkills())
  } catch {
    return errorResponse("Failed to fetch skills", 500)
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
