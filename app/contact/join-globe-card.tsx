"use client"

import * as React from "react"
import { Globe2 } from "lucide-react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function JoinGlobeCard() {
  const [name, setName] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [fieldError, setFieldError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) {
      setFieldError("Name is required.")
      return
    }
    setFieldError(null)
    setLoading(true)
    setSuccess(false)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact/globe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const payload = (await res.json().catch(() => null)) as { error?: string; success?: boolean } | null

      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Submission failed. Please try again.")
      }

      setSuccess(true)
      setName("")
      posthog.capture("globe_join_submitted")
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Submission failed. Please try again."
      setSubmitError(errMsg)
      posthog.captureException(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="space-y-6 p-5 md:p-8">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold">Join the Globe</h2>
        <p className="text-sm text-muted-foreground">
          Drop your name on the globe on the homepage. Once I review it, your pin goes live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="globe-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="globe-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldError ? <p className="text-xs text-red-500">{fieldError}</p> : null}
        </div>

        <Button type="submit" disabled={loading}>
          <Globe2 className="mr-2 h-4 w-4" />
          {loading ? "Joining..." : "Join the Globe"}
        </Button>

        {success ? <p className="text-sm text-green-500">Thanks! Your pin will appear once reviewed.</p> : null}
        {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
      </form>
    </Card>
  )
}
