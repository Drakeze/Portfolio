import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  deleteCertification,
  getCertificationById,
  updateCertification,
} from "@/lib/domains/certifications/service"
import { certificationUpdateSchema } from "@/lib/domains/certifications/validators"

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

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    if (!ObjectId.isValid(id)) {
      return errorResponse("Invalid certification id")
    }

    const input = certificationUpdateSchema.parse(await request.json())
    const certification = await updateCertification(id, input)

    if (!certification) {
      return errorResponse("Certification not found", 404)
    }

    return successResponse(certification)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid certification payload")
    }

    return errorResponse("Failed to update certification", 500)
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params

  if (!ObjectId.isValid(id)) {
    return errorResponse("Invalid certification id")
  }

  const certification = await deleteCertification(id)
  if (!certification) {
    return errorResponse("Certification not found", 404)
  }

  return successResponse(certification)
}
