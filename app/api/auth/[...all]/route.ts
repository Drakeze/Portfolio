import { toNextJsHandler } from "better-auth/next-js"

import { auth } from "@/lib/auth"
import { createRateLimiter } from "@/lib/rate-limit"

const handler = toNextJsHandler(auth)

// Credential endpoints only. Sign-out, session reads and the like stay unthrottled
// so an active admin session is never interrupted.
const CREDENTIAL_PATHS = ["/sign-in", "/sign-up", "/forget-password", "/reset-password", "/change-password"]
const isRateLimited = createRateLimiter(10, 10 * 60 * 1000)

export const GET = handler.GET

export async function POST(request: Request) {
  const { pathname } = new URL(request.url)

  if (CREDENTIAL_PATHS.some((path) => pathname.includes(path))) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
      return Response.json(
        { message: "Too many attempts. Please try again in a few minutes." },
        { status: 429 },
      )
    }
  }

  return handler.POST(request)
}
