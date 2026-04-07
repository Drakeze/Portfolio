"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { authClient } from "@/src/lib/auth-client"

export function AdminSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    const nextPath = searchParams.get("next") ?? "/admin"
    const callbackURL = nextPath.startsWith("/admin") ? nextPath : "/admin"

    const result = await authClient.signIn.magicLink({
      email,
      callbackURL,
      errorCallbackURL: "/sign-in",
    })

    setLoading(false)

    if (result.error) {
      setError(result.error.message ?? "Unable to send a sign-in link.")
      return
    }

    setSuccess("Check your email for the secure sign-in link.")
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Admin sign in</h1>
        <p className="text-sm text-muted-foreground">
          Enter your admin email and I&apos;ll send you a secure sign-in link.
        </p>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="email"
          autoFocus
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
          {loading ? "Sending link..." : "Send sign-in link"}
        </button>
      </form>
    </main>
  )
}
