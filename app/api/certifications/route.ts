import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import {
  createCertification,
  deleteCertification,
  listCertifications,
  updateCertification,
} from "@/lib/domains/certifications/service"
import { certificationInputSchema, certificationUpdateSchema } from "@/lib/domains/certifications/validators"

export async function GET() {
  try {
    return successResponse(await listCertifications())
  } catch {
    return errorResponse("Failed to fetch certifications", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = certificationInputSchema.parse(await request.json())
    return successResponse(await createCertification(input), 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid certification payload")
    }

    return errorResponse("Failed to create certification", 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...payload } = await request.json()

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid certification id")
    }

    const input = certificationUpdateSchema.parse(payload)
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid certification id")
    }

    const certification = await deleteCertification(id)
    if (!certification) {
      return errorResponse("Certification not found", 404)
    }

    return successResponse(certification)
  } catch {
    return errorResponse("Failed to delete certification", 500)
  }
}
