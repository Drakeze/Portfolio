import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

/**
 * Optimistic UX redirect ONLY. getSessionCookie reads the cookie header and
 * returns the raw token; it does not verify a signature or hit the database,
 * so a forged cookie passes this check.
 *
 * Real auth lives in:
 *   - app/admin/layout.tsx  -> guardAdmin()  (reads)
 *   - every Server Action   -> guardAdmin()  (writes)
 *   - app/api/admin/*       -> requireAdmin()
 *
 * The matcher deliberately excludes /api/admin/* : those self-guard and must
 * answer with 401 JSON, not an HTML redirect their fetch callers can't parse.
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  const url = new URL("/sign-in", request.url)
  url.searchParams.set("next", request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/admin/:path*"],
}
