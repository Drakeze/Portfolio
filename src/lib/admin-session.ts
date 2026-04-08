import type { NextRequest, NextResponse } from "next/server"

export const ADMIN_SESSION_COOKIE_NAME = "portfolio_admin_session"

const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7
const SESSION_SIGNING_CONTEXT = "portfolio-admin-session"
const PASSWORD_SIGNING_CONTEXT = "portfolio-admin-password-check"
const textEncoder = new TextEncoder()

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured")
  }

  return password
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.BETTER_AUTH_SECRET ?? getAdminPassword()
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  )
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
}

async function signValue(secret: string, value: string) {
  const key = await importHmacKey(secret)
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value))

  return bufferToHex(signature)
}

export async function isValidAdminPassword(password: string) {
  const providedSignature = await signValue(password, PASSWORD_SIGNING_CONTEXT)
  const expectedSignature = await signValue(getAdminPassword(), PASSWORD_SIGNING_CONTEXT)

  return providedSignature === expectedSignature
}

export async function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000
  const nonce = crypto.randomUUID().replaceAll("-", "")
  const payload = `${expiresAt}.${nonce}.${SESSION_SIGNING_CONTEXT}`
  const signature = await signValue(getAdminSessionSecret(), payload)

  return `${expiresAt}.${nonce}.${signature}`
}

export async function validateAdminSessionToken(token: string | null | undefined) {
  if (!token) {
    return false
  }

  const [expiresAtValue, nonce, signature] = token.split(".")

  if (!expiresAtValue || !nonce || !signature) {
    return false
  }

  const expiresAt = Number(expiresAtValue)

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false
  }

  const payload = `${expiresAtValue}.${nonce}.${SESSION_SIGNING_CONTEXT}`
  let expectedSignature: string

  try {
    expectedSignature = await signValue(getAdminSessionSecret(), payload)
  } catch {
    return false
  }

  return signature === expectedSignature
}

export async function requestHasAdminSession(request: NextRequest) {
  return validateAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value)
}

export async function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: await createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}
