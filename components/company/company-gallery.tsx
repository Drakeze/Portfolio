"use client"

import { useState } from "react"
import Image from "next/image"

export function CompanyGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  if (!images?.length) return null

  const next = () => setIndex((prev) => (prev + 1) % images.length)
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border bg-muted/40">
        <Image
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 896px, 90vw"
          className="object-contain p-10"
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={prev}
          className="px-4 py-2 border rounded-md hover:bg-muted transition"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="px-4 py-2 border rounded-md hover:bg-muted transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
