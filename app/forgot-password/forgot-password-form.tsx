"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { authClient } from "@/lib/auth-client"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    })

    if (resetError) {
      setError(resetError.message ?? "Unable to send reset email.")
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            A password reset link has been sent to <strong>{email}</strong>. Check your inbox and click the link to set a
            new password.
          </p>
          <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your admin email and we&apos;ll send a reset link via Resend.
        </p>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="Admin email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <div className="flex items-center justify-between">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
            {loading ? "Sending..." : "Send reset link"}
          </button>
          <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
            Back to sign in
          </Link>
        </div>
      </form>
    </main>
  )
}
