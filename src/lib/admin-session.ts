import type { NextRequest, NextResponse } from "next/server"

import { collectionNames, getDb } from "@/lib/mongodb"

export const ADMIN_SESSION_COOKIE_NAME = "portfolio_admin_session"

const ADMIN_AUTH_COLLECTION_NAME = collectionNames.adminAuth
const ADMIN_PASSWORD_DOCUMENT_ID = "password"
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7
const SESSION_SIGNING_CONTEXT = "portfolio-admin-session"
const PASSWORD_SIGNING_CONTEXT = "portfolio-admin-password-check"
const PASSWORD_HASH_ITERATIONS = 210_000
const PASSWORD_MIN_LENGTH = 12
const textEncoder = new TextEncoder()

type StoredAdminPassword = {
  _id: typeof ADMIN_PASSWORD_DOCUMENT_ID
  algorithm: "pbkdf2-sha256"
  salt: string
  hash: string
  iterations: number
  updatedAt: string
}

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

function bufferToBase64(buffer: ArrayBuffer) {
  let binary = ""

  for (const byte of new Uint8Array(buffer)) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
}

function createRandomSalt() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return bufferToHex(bytes.buffer)
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false
  }

  let result = 0

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }

  return result === 0
}

async function hashPassword(password: string, salt: string, iterations = PASSWORD_HASH_ITERATIONS) {
  const key = await crypto.subtle.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"])
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: textEncoder.encode(salt),
      iterations,
    },
    key,
    256
  )

  return bufferToBase64(derivedBits)
}

async function signValue(secret: string, value: string) {
  const key = await importHmacKey(secret)
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value))

  return bufferToHex(signature)
}

async function getStoredAdminPassword() {
  const db = await getDb()
  return db.collection<StoredAdminPassword>(ADMIN_AUTH_COLLECTION_NAME).findOne({ _id: ADMIN_PASSWORD_DOCUMENT_ID })
}

async function verifyEnvAdminPassword(password: string) {
  const providedSignature = await signValue(password, PASSWORD_SIGNING_CONTEXT)
  const expectedSignature = await signValue(getAdminPassword(), PASSWORD_SIGNING_CONTEXT)

  return constantTimeEqual(providedSignature, expectedSignature)
}

async function verifyStoredAdminPassword(password: string, storedPassword: StoredAdminPassword) {
  const hashedPassword = await hashPassword(password, storedPassword.salt, storedPassword.iterations)

  return constantTimeEqual(hashedPassword, storedPassword.hash)
}

function validateNewPassword(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(`New password must be at least ${PASSWORD_MIN_LENGTH} characters long.`)
  }
}

export async function hasStoredAdminPassword() {
  return (await getStoredAdminPassword()) !== null
}

export async function isValidAdminPassword(password: string) {
  const storedPassword = await getStoredAdminPassword()

  if (storedPassword) {
    return verifyStoredAdminPassword(password, storedPassword)
  }

  return verifyEnvAdminPassword(password)
}

export async function updateAdminPassword(newPassword: string) {
  validateNewPassword(newPassword)

  const salt = createRandomSalt()
  const hash = await hashPassword(newPassword, salt)
  const db = await getDb()

  await db.collection<StoredAdminPassword>(ADMIN_AUTH_COLLECTION_NAME).updateOne(
    { _id: ADMIN_PASSWORD_DOCUMENT_ID },
    {
      $set: {
        algorithm: "pbkdf2-sha256",
        salt,
        hash,
        iterations: PASSWORD_HASH_ITERATIONS,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  )
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
