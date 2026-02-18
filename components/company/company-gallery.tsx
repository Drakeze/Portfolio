"use client"

import { useState } from "react"

export function CompanyGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  if (!images?.length) return null

  const next = () => setIndex((prev) => (prev + 1) % images.length)
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      <img
        src={images[index]}
        alt=""
        className="rounded-lg border"
      />

      <div className="flex justify-center gap-4">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  )
}