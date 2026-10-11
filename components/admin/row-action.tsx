"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { type ActionState, type AdminAction, IDLE } from "@/lib/admin/action-state"
import { cn } from "@/lib/utils"

/**
 * The only interactive part of a DataTable row. Everything it receives is
 * serializable (the server action reference, plain strings and objects), which
 * is why DataTable itself can stay a Server Component.
 *
 * Replaces ConfirmSubmitButton's window.confirm() with a real AlertDialog -
 * @radix-ui/react-alert-dialog was already installed and unused.
 */
export function RowAction({
  label,
  pendingLabel,
  action,
  values,
  confirm,
  tone = "default",
}: {
  label: string
  pendingLabel?: string
  action: AdminAction
  values: Record<string, string>
  confirm?: { title: string; description: string }
  tone?: "default" | "danger"
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, IDLE)
  const danger = tone === "danger"
  const toneClass = danger ? "text-destructive" : "text-foreground"

  return (
    <form action={formAction} className="inline-flex items-center gap-2">
      {Object.entries(values).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      {confirm ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button" className={cn("underline-offset-4 hover:underline", toneClass)}>
              {label}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirm.title}</AlertDialogTitle>
              <AlertDialogDescription>{confirm.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <ConfirmedSubmit label={label} danger={danger} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <PlainSubmit label={label} pendingLabel={pendingLabel} toneClass={toneClass} />
      )}

      {state.error ? (
        <span role="alert" className="text-[12px] text-destructive">
          {state.error}
        </span>
      ) : null}
    </form>
  )
}

function ConfirmedSubmit({ label, danger }: { label: string; danger: boolean }) {
  const { pending } = useFormStatus()
  return (
    <AlertDialogAction
      type="submit"
      disabled={pending}
      className={danger ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : undefined}
    >
      {pending ? "Working..." : label}
    </AlertDialogAction>
  )
}

function PlainSubmit({ label, pendingLabel, toneClass }: { label: string; pendingLabel?: string; toneClass: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={cn("underline-offset-4 hover:underline disabled:opacity-60", toneClass)}>
      {pending ? (pendingLabel ?? "Working...") : label}
    </button>
  )
}
