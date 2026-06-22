import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { Resend } from "resend"

import { getMongoDb } from "@/lib/mongodb"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: mongodbAdapter(getMongoDb()),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Drakeze Admin <noreply@drakeze.com>",
        to: user.email,
        subject: "Reset your admin password",
        html: `
          <p>You requested a password reset for your Drakeze admin account.</p>
          <p><a href="${url}">Click here to reset your password</a></p>
          <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        `,
      })
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async () => {
          const existing = await getMongoDb().collection("user").findOne({})
          if (existing) {
            return false
          }
        },
      },
    },
  },
})
