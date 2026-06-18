import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request)

  if (!session) {
    const url = new URL("/sign-in", request.url)
    url.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
