import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { getBio, upsertBio } from "@/lib/domains/bio/service"
import { bioInputSchema } from "@/lib/domains/bio/validators"

export async function GET() {
  try {
    return successResponse(await getBio())
  } catch {
    return errorResponse("Failed to fetch bio", 500)
  }
}

export async function PUT(request: Request) {
  try {
    const input = bioInputSchema.parse(await request.json())
    const bio = await upsertBio(input)
    return successResponse(bio)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid bio payload")
    return errorResponse("Failed to save bio", 500)
  }
}
