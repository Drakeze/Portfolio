import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { isAdmin } from "@/src/lib/admin"
import { auth } from "@/src/lib/auth"

function unauthorizedResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const loginUrl = new URL("/sign-in", request.url)
  loginUrl.searchParams.set("next", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

function forbiddenResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.redirect(new URL("/", request.url))
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return unauthorizedResponse(request)
  }

  if (!isAdmin(session.user)) {
    return forbiddenResponse(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
