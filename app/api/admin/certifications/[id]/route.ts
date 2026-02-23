import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { getCertificationById, softDeleteCertification, updateCertification } from "@/lib/domains/certifications/service"
import { certificationUpdateSchema } from "@/lib/domains/certifications/validators"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid certification id")

  const data = await getCertificationById(id)
  if (!data) return errorResponse("Certification not found", 404)

  return successResponse(data)
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    if (!ObjectId.isValid(id)) return errorResponse("Invalid certification id")

    const input = certificationUpdateSchema.parse(await request.json())
    const data = await updateCertification(id, input)
    if (!data) return errorResponse("Certification not found", 404)

    return successResponse(data)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid certification payload")
    return errorResponse("Failed to update certification", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return errorResponse("Invalid certification id")

  const data = await softDeleteCertification(id)
  if (!data) return errorResponse("Certification not found", 404)

  return successResponse(data)
}
