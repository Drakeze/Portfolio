import { ZodError } from "zod"

import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { getLinks, upsertLinks } from "@/lib/domains/links/service"
import { linksInputSchema } from "@/lib/domains/links/validators"

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
    return successResponse(await getLinks())
  } catch {
    return errorResponse("Failed to fetch links", 500)
  }
}

export async function PUT(request: Request) {
  const denied = await authGuard()
  if (denied) return denied

  try {
    const input = linksInputSchema.parse(await request.json())
    const links = await upsertLinks(input)
    return successResponse(links)
  } catch (error) {
    if (error instanceof ZodError) return errorResponse(error.issues[0]?.message ?? "Invalid links payload")
    return errorResponse("Failed to save links", 500)
  }
}
