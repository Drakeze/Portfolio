"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!response.ok) {
      setError("Invalid password")
      return
    }

    const nextPath = new URLSearchParams(window.location.search).get("next") ?? "/admin"
    router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin")
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold">Admin login</h1>
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          type="password"
          placeholder="Password"
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
