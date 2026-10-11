import "server-only"

import { Resend } from "resend"

import { siteConfig } from "@/lib/seo"

const resendApiKey = process.env.RESEND_API_KEY

export const resend = resendApiKey ? new Resend(resendApiKey) : null

export function getMailFrom() {
  return process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>"
}

export function getContactRecipientEmail() {
  return process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL ?? process.env.RESEND_TO_EMAIL ?? siteConfig.email
}
