"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

type Props = {
  currentLabel: string
  currentUrl: string
}

export function ResumeEditor({ currentLabel, currentUrl }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [label, setLabel] = useState(currentLabel)
  const [url, setUrl] = useState(currentUrl)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadProgress(`Uploading ${file.name}...`)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/resume/upload", {
        method: "POST",
        body: formData,
      })

      const data = (await res.json()) as { success?: boolean; data?: { url: string; filename: string }; error?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Upload failed")
      }

      setUrl(data.data!.url)
      setUploadProgress(null)
      setFeedback({ type: "success", message: `Uploaded ${file.name}. Click Save to apply.` })
    } catch (err) {
      setUploadProgress(null)
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Upload failed." })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, url }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Save failed")
      }

      setFeedback({ type: "success", message: "Resume saved successfully." })
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

      {uploadProgress ? (
        <div className="rounded-md bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-400">
          {uploadProgress}
        </div>
      ) : null}

      {/* Current resume */}
      {url ? (
        <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Current Resume</p>
            <p className="text-sm font-medium truncate max-w-xs">{url}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Preview
          </a>
        </div>
      ) : null}

      <div className="rounded-lg border bg-background p-6 space-y-5">
        {/* Upload new file */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-muted-foreground">Upload New PDF</label>
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={uploading}
              className="block text-sm text-muted-foreground file:mr-3 file:rounded-md file:border file:bg-background file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-foreground hover:file:bg-muted disabled:opacity-50"
            />
          </div>
          <p className="text-xs text-muted-foreground">PDF only · max 10 MB · uploads to Cloudflare R2</p>
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="text-xs text-muted-foreground">
            Or manually set a URL (e.g. <code className="font-mono">/ashead-resume.pdf</code> for a file in{" "}
            <code className="font-mono">/public/</code>).
          </p>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">Button Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Download Resume"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/ashead-resume.pdf or https://..."
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploading}
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {saving ? "Saving..." : "Save Resume"}
      </button>
    </div>
  )
}
