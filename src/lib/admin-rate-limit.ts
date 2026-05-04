const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000
const ADMIN_LOGIN_MAX_ATTEMPTS = 5
const ADMIN_LOGIN_LOCKOUT_MS = 15 * 60 * 1000

type LoginAttemptState = {
  attempts: number
  firstAttemptAt: number
  blockedUntil?: number
}

type GlobalWithAdminRateLimit = typeof globalThis & {
  __portfolioAdminLoginRateLimit?: Map<string, LoginAttemptState>
}

function getRateLimitStore() {
  const globalWithRateLimit = globalThis as GlobalWithAdminRateLimit

  if (!globalWithRateLimit.__portfolioAdminLoginRateLimit) {
    globalWithRateLimit.__portfolioAdminLoginRateLimit = new Map()
  }

  return globalWithRateLimit.__portfolioAdminLoginRateLimit
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    const forwardedIp = forwardedFor.split(",")[0]?.trim()
    if (forwardedIp) {
      return forwardedIp
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) {
    return realIp
  }

  return "unknown"
}

function getKey(request: Request) {
  return getClientIp(request)
}

function getActiveState(key: string, now: number) {
  const store = getRateLimitStore()
  const state = store.get(key)

  if (!state) {
    return null
  }

  if (state.blockedUntil && state.blockedUntil > now) {
    return state
  }

  if (state.blockedUntil && state.blockedUntil <= now) {
    store.delete(key)
    return null
  }

  if (now - state.firstAttemptAt > ADMIN_LOGIN_WINDOW_MS) {
    store.delete(key)
    return null
  }

  return state
}

export function getAdminLoginRateLimitStatus(request: Request) {
  const now = Date.now()
  const key = getKey(request)
  const state = getActiveState(key, now)

  if (!state?.blockedUntil || state.blockedUntil <= now) {
    return {
      blocked: false,
      retryAfterSeconds: 0,
    }
  }

  return {
    blocked: true,
    retryAfterSeconds: Math.max(1, Math.ceil((state.blockedUntil - now) / 1000)),
  }
}

export function recordFailedAdminLoginAttempt(request: Request) {
  const now = Date.now()
  const key = getKey(request)
  const store = getRateLimitStore()
  const currentState = getActiveState(key, now)

  const nextState: LoginAttemptState =
    currentState === null
      ? {
          attempts: 1,
          firstAttemptAt: now,
        }
      : {
          ...currentState,
          attempts: currentState.attempts + 1,
        }

  if (nextState.attempts >= ADMIN_LOGIN_MAX_ATTEMPTS) {
    nextState.blockedUntil = now + ADMIN_LOGIN_LOCKOUT_MS
  }

  store.set(key, nextState)

  return {
    blocked: Boolean(nextState.blockedUntil && nextState.blockedUntil > now),
    retryAfterSeconds: nextState.blockedUntil
      ? Math.max(1, Math.ceil((nextState.blockedUntil - now) / 1000))
      : 0,
    attemptsRemaining: Math.max(0, ADMIN_LOGIN_MAX_ATTEMPTS - nextState.attempts),
  }
}

export function clearFailedAdminLoginAttempts(request: Request) {
  getRateLimitStore().delete(getKey(request))
}
