"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import posthog from "posthog-js"

import { authClient } from "@/lib/auth-client"

export function AdminSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const nextPath = searchParams.get("next") ?? "/admin"
    const redirectPath = nextPath.startsWith("/admin") ? nextPath : "/admin"

    try {
      const { error: signInError } = await authClient.signIn.email({ email, password })

      if (signInError) {
        setError(signInError.message ?? "Unable to sign in.")
        posthog.capture("admin_sign_in_failed", { error_message: signInError.message })
        setLoading(false)
        return
      }

      posthog.identify(email, { email })
      posthog.capture("admin_signed_in")
      setPassword("")
      router.replace(redirectPath)
      router.refresh()
    } catch (err) {
      setError("Connection error. Please try again.")
      posthog.capture("admin_sign_in_failed", { error_message: "connection_error" })
      posthog.captureException(err)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-accent px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl border bg-card p-8 shadow-sm">
        <Link href="/" className="inline-block font-semibold text-lg hover:text-muted-foreground transition-colors">
          AS
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your admin credentials to access the portfolio dashboard.</p>
        </div>
        <input
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple/40"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple/40"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <div className="flex items-center justify-between pt-2">
          <button
            className="rounded-full bg-brand-purple px-5 py-2 text-sm font-medium text-brand-purple-foreground transition-colors hover:bg-brand-purple/90 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
            Forgot password?
          </Link>
        </div>
      </form>
    </main>
  )
}
