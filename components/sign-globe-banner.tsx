"use client"

import posthog from "posthog-js"
import { useRef, useState } from "react"

function GlobeMark() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <ellipse cx="28" cy="21" rx="25" ry="9" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <ellipse cx="28" cy="35" rx="25" ry="9" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <line x1="3" y1="28" x2="53" y2="28" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <ellipse cx="28" cy="28" rx="11" ry="25" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <circle cx="18" cy="26" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="38" cy="33" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="24" cy="39" r="1.5" fill="rgba(255,255,255,0.5)" />
      <path
        d="M28 14C24.5 14 22 16.7 22 20C22 24.8 28 31 28 31C28 31 34 24.8 34 20C34 16.7 31.5 14 28 14Z"
        fill="#883A98"
      />
      <circle cx="28" cy="20" r="2.5" fill="white" />
    </svg>
  )
}

export function SignGlobeBanner() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError("Name is required.")
      inputRef.current?.focus()
      return
    }
    if (trimmed.length > 60) {
      setError("Name must be 60 characters or fewer.")
      return
    }
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/contact/globe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
      const payload = (await res.json().catch(() => null)) as { error?: string; success?: boolean } | null

      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Submission failed. Try again.")
      }
      setSuccess(true)
      setName("")
      posthog.capture("globe_join_submitted", { source: "banner" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-[#2C1331] px-5 sm:px-20 py-9">
      <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Globe mark */}
        <div className="shrink-0">
          <GlobeMark />
        </div>

        {/* Copy */}
        <div className="flex-1 text-center sm:text-left">
          <p className="font-medium text-[26px] text-white leading-tight">Sign the globe</p>
          <p className="mt-1 font-mono text-[13px] text-dim">
            Add your name and it shows up as a dot on the globe on the home page. No email needed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          {success ? (
            <p className="font-mono text-[13px] text-dot-status">Thanks! Your pin will appear once reviewed.</p>
          ) : (
            <>
              <div className="flex-1 sm:flex-initial">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={60}
                  aria-label="Your name"
                  aria-describedby={error ? "globe-error" : undefined}
                  className="w-full sm:w-48 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
                {error ? (
                  <p id="globe-error" className="mt-1 font-mono text-[11px] text-red-400">
                    {error}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-white text-ink px-5 py-2 text-sm font-medium hover:bg-white/90 transition-opacity disabled:opacity-60 shrink-0"
              >
                {loading ? "Adding…" : "Add →"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
