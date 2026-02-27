import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  createCompany,
  deleteCompany,
  getCompanyBySlug,
  listCompanies,
  updateCompany,
} from "@/lib/domains/companies/service"
import { companyInputSchema, companyUpdateSchema } from "@/lib/domains/companies/validators"

export async function GET() {
  try {
    return successResponse(await listCompanies())
  } catch {
    return errorResponse("Failed to fetch companies", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = companyInputSchema.parse(await request.json())
    const existing = await getCompanyBySlug(input.slug)

    if (existing) {
      return errorResponse("A company with this slug already exists", 409)
    }

    return successResponse(await createCompany(input), 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid company payload")
    }

    return errorResponse("Failed to create company", 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...payload } = await request.json()

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid company id")
    }

    const input = companyUpdateSchema.parse(payload)

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

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid company id")
    }

    const company = await deleteCompany(id)
    if (!company) {
      return errorResponse("Company not found", 404)
    }

    return successResponse(company)
  } catch {
    return errorResponse("Failed to delete company", 500)
  }
}
