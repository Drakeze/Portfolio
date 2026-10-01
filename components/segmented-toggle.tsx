"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

export interface SegmentedOption {
  label: string
  value: string
}

interface SegmentedToggleProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedToggle({ options, value, onChange, className }: SegmentedToggleProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      const next = (index + 1) % options.length
      tabsRef.current[next]?.focus()
      onChange(options[next].value)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      const prev = (index - 1 + options.length) % options.length
      tabsRef.current[prev]?.focus()
      onChange(options[prev].value)
    }
  }

  return (
    <div
      role="tablist"
      aria-label="View options"
      className={cn("inline-flex rounded-full bg-muted p-1 gap-0.5", className)}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          tabIndex={value === opt.value ? 0 : -1}
          ref={(el) => {
            tabsRef.current[i] = el
          }}
          onClick={() => onChange(opt.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === opt.value
              ? "bg-white shadow-sm font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
