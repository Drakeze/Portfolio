import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/admin"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const isAuthenticated = request.cookies.get(ADMIN_SESSION_COOKIE)?.value === "authenticated"

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
