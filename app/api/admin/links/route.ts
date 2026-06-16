import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { getLinks, upsertLinks } from "@/lib/domains/links/service"
import { linksInputSchema } from "@/lib/domains/links/validators"

export async function GET() {
  try {
    return successResponse(await getLinks())
  } catch {
    return errorResponse("Failed to fetch links", 500)
  }
}

export async function PUT(request: Request) {
  try {
    const input = linksInputSchema.parse(await request.json())
    const links = await upsertLinks(input)
    return successResponse(links)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid links payload")
    return errorResponse("Failed to save links", 500)
  }
}
