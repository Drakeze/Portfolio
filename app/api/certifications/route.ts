import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { listCertifications } from "@/lib/domains/certifications/service"

export async function GET() {
  try {
    return successResponse(await listCertifications())
  } catch {
    return errorResponse("Failed to fetch certifications", 500)
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
