"use client"

import { useEffect } from "react"

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
      <h2 className="text-xl font-semibold">Admin section failed to load</h2>
      <p className="max-w-md text-sm text-muted-foreground">Your data is safe. Retry this page or return to the dashboard.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
        >
          Retry
        </button>
        <a href="/admin" className="rounded-md border px-4 py-2 text-sm hover:bg-muted/40">
          Dashboard
        </a>
      </div>
    </main>
  )
}
