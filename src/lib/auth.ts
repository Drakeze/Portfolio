import "server-only"

import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { betterAuth } from "better-auth"
import { magicLink } from "better-auth/plugins"

import { getMongoClient, getMongoDb } from "@/lib/mongodb"
import { isAdmin } from "@/src/lib/admin"
import { getMailFrom, resend } from "@/src/lib/resend"

function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET

  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is not configured")
  }

  return secret
}

function getBaseUrl() {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

export const auth = betterAuth({
  appName: "Portfolio Admin",
  baseURL: getBaseUrl(),
  secret: getAuthSecret(),
  database: mongodbAdapter(getMongoDb(), {
    client: getMongoClient(),
  }),
  telemetry: {
    enabled: false,
  },
  plugins: [
    magicLink({
      expiresIn: 60 * 15,
      disableSignUp: false,
      sendMagicLink: async ({ email, url }) => {
        if (!resend) {
          throw new Error("RESEND_API_KEY is not configured")
        }

        const result = await resend.emails.send({
          from: getMailFrom(),
          to: email,
          subject: "Your portfolio admin sign-in link",
          html: `
            <p>Use the secure link below to sign in to your portfolio admin.</p>
            <p><a href="${url}">Sign in to admin</a></p>
            <p>This link expires in 15 minutes.</p>
          `,
          text: `Use this secure link to sign in to your portfolio admin: ${url}`,
        })

        if (result.error) {
          throw new Error(result.error.message)
        }
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/magic-link") {
        return
      }

      const email = typeof ctx.body?.email === "string" ? ctx.body.email : null

      if (!isAdmin({ email })) {
        throw new APIError("FORBIDDEN", {
          message: "This account is not allowed to access the admin area.",
        })
      }
    }),
  },
})
