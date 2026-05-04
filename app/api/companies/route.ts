import { methodNotAllowedResponse, errorResponse, successResponse } from "@/lib/api/responses"
import { listCompanies } from "@/lib/domains/companies/service"

export async function GET() {
  try {
    return successResponse(await listCompanies())
  } catch {
    return errorResponse("Failed to fetch companies", 500)
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
