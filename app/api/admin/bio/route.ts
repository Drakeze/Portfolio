import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { getBio, upsertBio } from "@/lib/domains/bio/service"
import { bioInputSchema } from "@/lib/domains/bio/validators"

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
    return successResponse(await getBio())
  } catch {
    return errorResponse("Failed to fetch bio", 500)
  }
}

export async function PUT(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = bioInputSchema.parse(await request.json())
    const bio = await upsertBio(input)
    return successResponse(bio)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid bio payload")
    return errorResponse("Failed to save bio", 500)
  }
}
