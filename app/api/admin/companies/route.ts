import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { companyInputSchema } from "@/lib/domains/companies/validators"
import { createCompany, listCompanies } from "@/lib/domains/companies/service"

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
    return successResponse(await createCompany(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid company payload")
    return errorResponse("Failed to create company", 500)
  }
}
