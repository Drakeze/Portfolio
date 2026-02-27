import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { deleteCompany, getCompanyById, getCompanyBySlug, updateCompany } from "@/lib/domains/companies/service"
import { companyUpdateSchema } from "@/lib/domains/companies/validators"

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

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    if (!ObjectId.isValid(id)) {
      return errorResponse("Invalid company id")
    }

    const input = companyUpdateSchema.parse(await request.json())

    if (input.slug) {
      const existing = await getCompanyBySlug(input.slug)
      if (existing && existing._id?.toString() !== id) {
        return errorResponse("A company with this slug already exists", 409)
      }
    }

    const company = await updateCompany(id, input)
    if (!company) {
      return errorResponse("Company not found", 404)
    }

    return successResponse(company)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid company payload")
    }

    return errorResponse("Failed to update company", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid company id")
  }

  const company = await deleteCompany(id)
  if (!company) {
    return errorResponse("Company not found", 404)
  }

  return successResponse(company)
}
