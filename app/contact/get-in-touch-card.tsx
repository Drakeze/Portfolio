"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SocialsGrid } from "@/components/sections/socials-workshop"
import type { SocialLinks } from "@/lib/domains/links/types"

export function GetInTouchCard({ socials }: { socials: SocialLinks }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<{ name?: string; email?: string; message?: string }>({})

  function validate() {
    const errors: typeof fieldErrors = {}
    if (!name.trim()) errors.name = "Name is required."
    if (!email.trim()) {
      errors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address."
    }
    if (!message.trim()) errors.message = "Message is required."
    return errors
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setLoading(true)
    setSuccess(false)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const payload = (await res.json().catch(() => null)) as { error?: string; success?: boolean } | null

      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Message failed to send. Please try again.")
      }

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
      posthog.capture("contact_form_submitted")
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Message failed to send. Please try again."
      setSubmitError(errMsg)
      posthog.capture("contact_form_error", { error_message: errMsg })
      posthog.captureException(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="space-y-6 p-5 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="contact-name"
            type="text"
            placeholder="Your name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name ? <p className="text-xs text-red-500">{fieldErrors.name}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email ? <p className="text-xs text-red-500">{fieldErrors.email}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="contact-message"
            placeholder="Tell me about your project or idea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
          {fieldErrors.message ? <p className="text-xs text-red-500">{fieldErrors.message}</p> : null}
        </div>

        <Button type="submit" disabled={loading}>
          <Mail className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Send Message"}
        </Button>

        {success ? <p className="text-sm text-green-500">Message sent successfully.</p> : null}
        {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
      </form>

      <div className="border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">Socials</h2>
        <SocialsGrid socials={socials} />
      </div>
    </Card>
  )
}
