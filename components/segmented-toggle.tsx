"use client"

import { useId, useRef } from "react"

import { cn } from "@/lib/utils"

export interface SegmentedOption {
  label: string
  value: string
}

interface SegmentedToggleProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  /** Announced name. Every instance used to announce "View options". */
  label: string
  /**
   * "tabs" shows and hides panels; "radiogroup" picks a value without
   * revealing anything. /contact uses this to choose a message topic, which
   * is a radio group - calling it a tablist promised a panel that never
   * existed.
   */
  as?: "tabs" | "radiogroup"
  /** Maps a value to the id of the element it controls. Tabs mode only. */
  panelId?: (value: string) => string
  className?: string
}

export function SegmentedToggle({
  options,
  value,
  onChange,
  label,
  as = "tabs",
  panelId,
  className,
}: SegmentedToggleProps) {
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([])
  const generatedId = useId()
  const isTabs = as === "tabs"

  function focusAndSelect(index: number) {
    itemsRef.current[index]?.focus()
    onChange(options[index].value)
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      focusAndSelect((index + 1) % options.length)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      focusAndSelect((index - 1 + options.length) % options.length)
    } else if (e.key === "Home") {
      e.preventDefault()
      focusAndSelect(0)
    } else if (e.key === "End") {
      e.preventDefault()
      focusAndSelect(options.length - 1)
    }
  }

  return (
    <div
      role={isTabs ? "tablist" : "radiogroup"}
      aria-label={label}
      className={cn("inline-flex rounded-full bg-muted p-1 gap-0.5", className)}
    >
      {options.map((opt, i) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role={isTabs ? "tab" : "radio"}
            id={isTabs ? `${generatedId}-${opt.value}` : undefined}
            aria-selected={isTabs ? selected : undefined}
            aria-checked={isTabs ? undefined : selected}
            aria-controls={isTabs ? panelId?.(opt.value) : undefined}
            tabIndex={selected ? 0 : -1}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected ? "bg-card shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/** Id helper so a tab and its panel agree without hand-written strings. */
export function segmentedPanelId(scope: string, value: string) {
  return `${scope}-panel-${value}`
}
