"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function AdminSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
      const payload = (await response.json().catch(() => null)) as { error?: string; success?: boolean } | null

      if (!response.ok || !payload?.success) {
        setError(payload?.error ?? "Unable to sign in.")
        return
      }

      setPassword("")
      router.replace(redirectPath)
      router.refresh()
    } catch {
      setError("Unable to sign in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Admin sign in</h1>
        <p className="text-sm text-muted-foreground">
          Enter the admin password to access your portfolio dashboard.
        </p>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="password"
          autoComplete="current-password"
          autoFocus
          placeholder="Admin password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  )
}
