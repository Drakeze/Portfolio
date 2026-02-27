import { ObjectId } from "mongodb"
import { ZodError } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createSkill, deleteSkill, listSkills, updateSkill } from "@/lib/domains/skills/service"
import { skillInputSchema, skillUpdateSchema } from "@/lib/domains/skills/validators"

export async function GET() {
  try {
    return successResponse(await listSkills())
  } catch {
    return errorResponse("Failed to fetch skills", 500)
  }
}

export async function POST(request: Request) {
  try {
    const input = skillInputSchema.parse(await request.json())
    return successResponse(await createSkill(input), 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    }

    return errorResponse("Failed to create skill", 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...payload } = await request.json()

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid skill id")
    }

    const input = skillUpdateSchema.parse(payload)
    const skill = await updateSkill(id, input)

    if (!skill) {
      return errorResponse("Skill not found", 404)
    }

    return successResponse(skill)
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid skill payload")
    }

    return errorResponse("Failed to update skill", 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return errorResponse("Invalid skill id")
    }

    const skill = await deleteSkill(id)
    if (!skill) {
      return errorResponse("Skill not found", 404)
    }

    return successResponse(skill)
  } catch {
    return errorResponse("Failed to delete skill", 500)
  }
}
