"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"

type SubmitButtonProps = {
  label: string
  pendingLabel?: string
  className?: string
}

const interactionClasses = "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"

export function SubmitButton({ label, pendingLabel = "Saving...", className }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={cn(interactionClasses, className)} aria-disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  )
}

type ConfirmSubmitButtonProps = SubmitButtonProps & {
  confirmMessage: string
}

export function ConfirmSubmitButton({
  label,
  pendingLabel = "Processing...",
  confirmMessage,
  className,
}: ConfirmSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault()
        }
      }}
      className={cn(interactionClasses, className)}
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
