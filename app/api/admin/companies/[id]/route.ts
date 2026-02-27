import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { companyUpdateSchema } from "@/lib/domains/companies/validators"
import { deleteCompany, getCompanyById, updateCompany } from "@/lib/domains/companies/service"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid company id")

  const data = await getCompanyById(id)
  if (!data) return errorResponse("Company not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    if (!ObjectId.isValid(id)) return errorResponse("Invalid company id")

    const input = companyUpdateSchema.parse(await request.json())
    const data = await updateCompany(id, input)
    if (!data) return errorResponse("Company not found", 404)

    return successResponse(data)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid company payload")
    return errorResponse("Failed to update company", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid company id")

  const data = await deleteCompany(id)
  if (!data) return errorResponse("Company not found", 404)

  return successResponse(data)
}
