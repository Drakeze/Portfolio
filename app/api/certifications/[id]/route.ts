import { ObjectId } from "mongodb"

import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { getCertificationById } from "@/lib/domains/certifications/service"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid certification id")
  }

  const certification = await getCertificationById(id)
  if (!certification) {
    return errorResponse("Certification not found", 404)
  }

  return successResponse(certification)
}

export async function PATCH() {
  return methodNotAllowedResponse(["GET"])
}

export async function DELETE() {
  return methodNotAllowedResponse(["GET"])
}
