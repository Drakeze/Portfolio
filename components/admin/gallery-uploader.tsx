"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Props = {
  name: string
  defaultValue?: string[]
  folder?: string
}

export function GalleryUploader({ name, defaultValue = [], folder = "gallery" }: Props) {
  const [urls, setUrls] = useState<string[]>(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList) {
    setError("")
    setUploading(true)

    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const form = new FormData()
      form.append("file", file)
      form.append("folder", folder)

      try {
        const res = await fetch("/api/admin/upload/image", { method: "POST", body: form })
        const json = await res.json()

        if (!res.ok || !json.data?.url) {
          setError(json.error ?? "One or more uploads failed")
          continue
        }

        uploaded.push(json.data.url)
      } catch {
        setError("Upload failed. Check your connection.")
      }
    }

    if (uploaded.length) setUrls((prev) => [...prev, ...uploaded])
    setUploading(false)
  }

  function remove(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <span className="text-sm">Gallery images</span>

      {urls.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, i) => (
            <div key={i} className="group relative overflow-hidden rounded-md border bg-muted/30" style={{ aspectRatio: "16/9" }}>
              <Image src={url} alt={`Gallery image ${i + 1}`} fill className="object-contain" unoptimized />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-md border border-dashed bg-muted/20 py-8 text-sm text-muted-foreground">
          No images yet
        </div>
      )}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="rounded-md border px-3 py-1.5 text-sm transition hover:bg-muted disabled:opacity-60"
      >
        {uploading ? "Uploading…" : "Add images"}
      </button>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files) }}
      />

      <input type="hidden" name={name} value={urls.join("\n")} />
    </div>
  )
}
