"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import posthog from "posthog-js"

import { authClient } from "@/lib/auth-client"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-semibold">Invalid link</h1>
          <p className="text-sm text-muted-foreground">
            This reset link is missing a token. Request a new one from the forgot password page.
          </p>
          <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
            Request new link
          </Link>
        </div>
      </main>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword,
        token,
      })

      if (resetError) {
        setError(resetError.message ?? "Unable to reset password. The link may have expired.")
        setLoading(false)
        return
      }

      posthog.capture("password_reset_completed")
      router.replace("/sign-in?reset=1")
    } catch (err) {
      setError("Connection error. Please try again.")
      posthog.captureException(err)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Set new password</h1>
        <p className="text-sm text-muted-foreground">Choose a strong password for your admin account.</p>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="password"
          autoComplete="new-password"
          autoFocus
          placeholder="New password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          minLength={8}
          required
        />
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
          {loading ? "Saving..." : "Set new password"}
        </button>
      </form>
    </main>
  )
}
