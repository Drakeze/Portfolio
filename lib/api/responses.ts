import { NextResponse } from "next/server"

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status })
}

export function methodNotAllowedResponse(allowedMethods: string[]) {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    {
      status: 405,
      headers: allowedMethods.length > 0 ? { Allow: allowedMethods.join(", ") } : undefined,
    }
  )
}
