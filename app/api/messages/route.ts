import { methodNotAllowedResponse } from "@/lib/api/responses"

const allowedMethods: string[] = []

export async function GET() {
  return methodNotAllowedResponse(allowedMethods)
}

export async function POST() {
  return methodNotAllowedResponse(allowedMethods)
}

export async function PATCH() {
  return methodNotAllowedResponse(allowedMethods)
}

export async function DELETE() {
  return methodNotAllowedResponse(allowedMethods)
}
