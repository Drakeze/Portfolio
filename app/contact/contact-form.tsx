"use client"

import { SegmentedToggle } from "@/components/segmented-toggle"
import { useState } from "react"

const SOURCE_OPTIONS = [
  { label: "A role", value: "role" },
  { label: "A project", value: "project" },
  { label: "Just saying hi", value: "hi" },
]

const SOURCE_LABELS: Record<string, string> = {
  role: "Looking for: Role",
  project: "About: A project",
  hi: "Just saying hi",
}

type FormState = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [source, setSource] = useState("hi")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // silent drop

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all fields.")
      return
    }

    setState("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: `[${SOURCE_LABELS[source]}]\n\n${message.trim()}`,
        }),
      })

      const data = (await res.json().catch(() => null)) as { error?: string } | null

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.")
      }

      setState("success")
      setName("")
      setEmail("")
      setMessage("")
      setSource("hi")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-border p-8 flex flex-col gap-3">
        <p className="font-medium text-foreground text-[17px]">Message sent.</p>
        <p className="font-mono text-[13px] text-muted-foreground">
          I&apos;ll get back to you within two business days.
        </p>
        <button
          onClick={() => setState("idle")}
          className="font-mono text-[13px] underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors w-fit mt-1"
        >
          Send another →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border p-6 sm:p-8 flex flex-col gap-5">
      {/* Source toggle */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase">
          This is about
        </label>
        <SegmentedToggle options={SOURCE_OPTIONS} value={source} onChange={setSource} />
      </div>

      {/* Name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border-strong transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border-strong transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase">
          Message
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          rows={5}
          required
          className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border-strong transition-colors resize-none"
        />
      </div>

      {/* Honeypot — visually hidden, real users never fill it */}
      <div className="opacity-0 absolute -z-10" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errorMsg ? (
        <p className="font-mono text-[12px] text-red-500">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 w-fit"
      >
        {state === "loading" ? "Sending…" : "Send →"}
      </button>
    </form>
  )
}
