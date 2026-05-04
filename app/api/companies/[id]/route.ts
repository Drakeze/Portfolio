import { ObjectId } from "mongodb"

import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { getCompanyById } from "@/lib/domains/companies/service"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid company id")
  }

  const company = await getCompanyById(id)
  if (!company) {
    return errorResponse("Company not found", 404)
  }

  return successResponse(company)
}

export async function PATCH() {
  return methodNotAllowedResponse(["GET"])
}

export async function DELETE() {
  return methodNotAllowedResponse(["GET"])
}
