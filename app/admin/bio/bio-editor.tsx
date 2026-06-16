"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import type { BioParagraph } from "@/lib/domains/bio/types"

type Props = {
  initialParagraphs: BioParagraph[]
}

export function BioEditor({ initialParagraphs }: Props) {
  const router = useRouter()
  const [paragraphs, setParagraphs] = useState<BioParagraph[]>(initialParagraphs)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  function addParagraph() {
    const maxOrder = paragraphs.reduce((max, p) => Math.max(max, p.order), -1)
    setParagraphs([...paragraphs, { id: `p${Date.now()}`, text: "", order: maxOrder + 1 }])
  }

  function removeParagraph(id: string) {
    setParagraphs(paragraphs.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i })))
  }

  function moveUp(index: number) {
    if (index === 0) return
    const next = [...paragraphs]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    setParagraphs(next.map((p, i) => ({ ...p, order: i })))
  }

  function moveDown(index: number) {
    if (index === paragraphs.length - 1) return
    const next = [...paragraphs]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    setParagraphs(next.map((p, i) => ({ ...p, order: i })))
  }

  function updateText(id: string, text: string) {
    setParagraphs(paragraphs.map((p) => (p.id === id ? { ...p, text } : p)))
  }

  async function handleSave() {
    const empty = paragraphs.find((p) => !p.text.trim())
    if (empty) {
      setFeedback({ type: "error", message: "All paragraphs must have text before saving." })
      return
    }

    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/admin/bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraphs }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Save failed")
      }

      setFeedback({ type: "success", message: "Bio saved successfully." })
      router.refresh()
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Save failed." })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        {paragraphs.map((p, index) => (
          <div key={p.id} className="rounded-lg border bg-background p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Paragraph {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === paragraphs.length - 1}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeParagraph(p.id)}
                  className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-500/10"
                  title="Remove"
                >
                  Remove
                </button>
              </div>
            </div>
            <textarea
              value={p.text}
              onChange={(e) => updateText(p.id, e.target.value)}
              rows={4}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-y"
              placeholder="Write your paragraph here..."
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={addParagraph}
          className="rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          + Add Paragraph
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving..." : "Save Bio"}
        </button>
        <span className="text-xs text-muted-foreground">{paragraphs.length} paragraph{paragraphs.length !== 1 ? "s" : ""}</span>
      </div>
    </div>
  )
}
