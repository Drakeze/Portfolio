"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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

    const { error: signInError } = await authClient.signIn.email({ email, password })

    if (signInError) {
      setError(signInError.message ?? "Unable to sign in.")
      setLoading(false)
      return
    }

    setPassword("")
    router.replace(redirectPath)
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Admin sign in</h1>
        <p className="text-sm text-muted-foreground">Enter your admin credentials to access the portfolio dashboard.</p>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <div className="flex items-center justify-between">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
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
