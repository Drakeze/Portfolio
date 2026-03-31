"use client"

import { useFormStatus } from "react-dom"

type SubmitButtonProps = {
  label: string
  pendingLabel?: string
  className?: string
}

export function SubmitButton({ label, pendingLabel = "Saving...", className }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      aria-disabled={pending}
    >
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
      className={className}
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
