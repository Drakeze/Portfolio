import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { companyUpdateSchema } from "@/lib/domains/companies/validators"
import { deleteCompany, getCompanyById, updateCompany } from "@/lib/domains/companies/service"

type RouteContext = { params: Promise<{ id: string }> }

async function authGuard() {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }
  return null
}

export async function GET(_: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid company id")

  const data = await getCompanyById(id)
  if (!data) return errorResponse("Company not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await authGuard()
  if (denied) return denied

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
  const denied = await authGuard()
  if (denied) return denied

  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid company id")

  const data = await deleteCompany(id)
  if (!data) return errorResponse("Company not found", 404)

  return successResponse(data)
}
