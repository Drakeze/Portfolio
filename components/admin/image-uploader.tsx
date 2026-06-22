"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Props = {
  name: string
  defaultValue?: string
  folder?: string
  label?: string
}

export function ImageUploader({ name, defaultValue = "", folder = "images", label = "Image" }: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError("")
    setUploading(true)

    const form = new FormData()
    form.append("file", file)
    form.append("folder", folder)

    try {
      const res = await fetch("/api/admin/upload/image", { method: "POST", body: form })
      const json = await res.json()

      if (!res.ok || !json.data?.url) {
        setError(json.error ?? "Upload failed")
        return
      }

      setUrl(json.data.url)
    } catch {
      setError("Upload failed. Check your connection.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm">{label}</span>

      {url ? (
        <div className="relative w-full overflow-hidden rounded-md border bg-muted/30" style={{ aspectRatio: "16/9" }}>
          <Image src={url} alt="Preview" fill className="object-contain" unoptimized />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center rounded-md border border-dashed bg-muted/20 py-10 text-sm text-muted-foreground" style={{ minHeight: "120px" }}>
          No image
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-md border px-3 py-1.5 text-sm transition hover:bg-muted disabled:opacity-60"
        >
          {uploading ? "Uploading…" : url ? "Replace image" : "Upload image"}
        </button>

        {url ? (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Remove
          </button>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      <input type="hidden" name={name} value={url} />
    </div>
  )
}
