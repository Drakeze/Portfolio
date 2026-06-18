import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { companyInputSchema } from "@/lib/domains/companies/validators"
import { createCompany, listCompanies } from "@/lib/domains/companies/service"

async function authGuard() {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }
  return null
}

export async function GET() {
  const denied = await authGuard()
  if (denied) return denied

  try {
    return successResponse(await listCompanies())
  } catch {
    return errorResponse("Failed to fetch companies", 500)
  }
}

export async function POST(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = companyInputSchema.parse(await request.json())
    return successResponse(await createCompany(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid company payload")
    return errorResponse("Failed to create company", 500)
  }
}
