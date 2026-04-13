import { NextRequest, NextResponse } from "next/server"

import { requestHasAdminSession } from "@/src/lib/admin-session"

function unauthorizedResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const loginUrl = new URL("/sign-in", request.url)
  loginUrl.searchParams.set("next", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/api/admin/session" && request.method === "POST") {
    return NextResponse.next()
  }

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  const hasSession = await requestHasAdminSession(request)
  if (!hasSession) {
    return unauthorizedResponse(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
