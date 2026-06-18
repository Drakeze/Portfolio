import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { createCertification, listCertifications } from "@/lib/domains/certifications/service"
import { certificationInputSchema } from "@/lib/domains/certifications/validators"

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
    return successResponse(await listCertifications())
  } catch {
    return errorResponse("Failed to fetch certifications", 500)
  }
}

export async function POST(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = certificationInputSchema.parse(await request.json())
    return successResponse(await createCertification(input), 201)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid certification payload")
    return errorResponse("Failed to create certification", 500)
  }
}
