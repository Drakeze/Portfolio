import { NextResponse } from "next/server"

import { getAdminPassword, setAdminSessionCookie } from "@/lib/auth/admin"

export async function POST(req: Request) {
  try {
    const { password } = (await req.json()) as { password?: string }

    if (!password || password !== getAdminPassword()) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }

    await setAdminSessionCookie()

    return NextResponse.json({ success: true, data: null })
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
