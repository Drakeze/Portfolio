"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import type { SocialLinks, VentureLink } from "@/lib/domains/links/types"

type Props = {
  initialSocials: SocialLinks
  initialVentures: VentureLink[]
}

const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
  { key: "github", label: "GitHub", placeholder: "https://github.com/..." },
  { key: "githubAlt", label: "GitHub (Alt)", placeholder: "https://github.com/..." },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/..." },
  { key: "twitter", label: "X / Twitter", placeholder: "https://x.com/..." },
  { key: "discord", label: "Discord", placeholder: "https://discord.gg/..." },
  { key: "patreon", label: "Patreon", placeholder: "https://patreon.com/..." },
]

export function LinksEditor({ initialSocials, initialVentures }: Props) {
  const router = useRouter()
  const [socials, setSocials] = useState<SocialLinks>(initialSocials)
  const [ventures, setVentures] = useState<VentureLink[]>(initialVentures)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  function updateSocial(key: keyof SocialLinks, value: string) {
    setSocials((prev) => ({ ...prev, [key]: value }))
  }

  function addVenture() {
    const newVenture: VentureLink = {
      key: `venture-${Date.now()}`,
      label: "",
      description: "",
      url: "",
      showInNav: false,
      showInEcosystem: true,
      order: ventures.length,
    }
    setVentures([...ventures, newVenture])
  }

  function removeVenture(index: number) {
    setVentures(ventures.filter((_, i) => i !== index).map((v, i) => ({ ...v, order: i })))
  }

  function updateVenture<K extends keyof VentureLink>(index: number, field: K, value: VentureLink[K]) {
    setVentures(ventures.map((v, i) => (i === index ? { ...v, [field]: value } : v)))
  }

  function moveVentureUp(index: number) {
    if (index === 0) return
    const next = [...ventures]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    setVentures(next.map((v, i) => ({ ...v, order: i })))
  }

  function moveVentureDown(index: number) {
    if (index === ventures.length - 1) return
    const next = [...ventures]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    setVentures(next.map((v, i) => ({ ...v, order: i })))
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/admin/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ socials, ventures }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Save failed")
      }

      setFeedback({ type: "success", message: "Links saved successfully." })
      router.refresh()
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Save failed." })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-10">
      {feedback ? (
        <div
          className={`rounded-md px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "bg-green-500/10 text-green-700 dark:text-green-400"
              : "bg-red-500/10 text-red-700 dark:text-red-400"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      {/* Social Links */}
      <section className="rounded-lg border bg-background p-6 space-y-4">
        <h2 className="text-sm font-medium">Social Links</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</label>
              <input
                type="url"
                value={socials[key] ?? ""}
                onChange={(e) => updateSocial(key, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Venture Links */}
      <section className="rounded-lg border bg-background p-6 space-y-4">
        <h2 className="text-sm font-medium">Venture Links</h2>
        <p className="text-xs text-muted-foreground">
          Show in Nav: appears in the Ecosystem dropdown. Show in Ecosystem: appears on the Contact page.
        </p>

        <div className="space-y-4">
          {ventures.map((venture, index) => (
            <div key={venture.key} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveVentureUp(index)}
                    disabled={index === 0}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveVentureDown(index)}
                    disabled={index === ventures.length - 1}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVenture(index)}
                    className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-muted-foreground">Label</label>
                  <input
                    type="text"
                    value={venture.label}
                    onChange={(e) => updateVenture(index, "label", e.target.value)}
                    placeholder="Soren Lab"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-muted-foreground">URL</label>
                  <input
                    type="url"
                    value={venture.url}
                    onChange={(e) => updateVenture(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Description</label>
                <input
                  type="text"
                  value={venture.description ?? ""}
                  onChange={(e) => updateVenture(index, "description", e.target.value)}
                  placeholder="Short description..."
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={venture.showInNav}
                    onChange={(e) => updateVenture(index, "showInNav", e.target.checked)}
                    className="rounded"
                  />
                  Show in Nav
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={venture.showInEcosystem}
                    onChange={(e) => updateVenture(index, "showInEcosystem", e.target.checked)}
                    className="rounded"
                  />
                  Show in Ecosystem
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addVenture}
          className="rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          + Add Venture
        </button>
      </section>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {saving ? "Saving..." : "Save All Links"}
      </button>
    </div>
  )
}
