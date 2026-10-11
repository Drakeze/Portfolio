"use client"

import Link from "next/link"
import { useActionState, useId } from "react"
import { useFormStatus } from "react-dom"

import { GalleryUploader } from "@/components/admin/gallery-uploader"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type ActionState, type AdminAction, IDLE } from "@/lib/admin/action-state"
import type { FieldConfig } from "@/lib/admin/fields"
import { cn } from "@/lib/utils"

/**
 * Schema-driven admin form. Replaces six hand-built forms, the input className
 * that was duplicated 54 times across 11 files, and the ?status=&message=
 * redirect flash system - which double-reported every action (a toast AND a
 * banner) and rendered "Project+deleted" literally, because decodeURIComponent
 * does not decode "+".
 *
 * Feedback comes from useActionState, so an error keeps the user's input
 * instead of bouncing them through a redirect.
 */
export function EntityForm({
  fields,
  action,
  defaults = {},
  cancelHref,
  submitLabel = "Save",
}: {
  fields: readonly FieldConfig[]
  action: AdminAction
  defaults?: Record<string, unknown>
  cancelHref: string
  submitLabel?: string
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, IDLE)
  const id = defaults.id

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {typeof id === "string" ? <input type="hidden" name="id" value={id} /> : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            defaultValue={defaults[field.name]}
            errors={state.fieldErrors?.[field.name]}
          />
        ))}
      </div>

      {state.error ? (
        <p role="alert" className="rounded-[8px] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-6">
        <SubmitButton label={submitLabel} />
        <Link
          href={cancelHref}
          className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

function Field({
  field,
  defaultValue,
  errors,
}: {
  field: FieldConfig
  defaultValue: unknown
  errors?: string[]
}) {
  const reactId = useId()
  const inputId = `${field.name}-${reactId}`
  const errorId = `${inputId}-error`
  const helpId = `${inputId}-help`
  const invalid = Boolean(errors?.length)
  const describedBy = [errors?.length ? errorId : null, field.help ? helpId : null].filter(Boolean).join(" ") || undefined

  // A checkbox default is boolean; everything else renders as text.
  const text = defaultValue === undefined || defaultValue === null ? "" : String(defaultValue)

  return (
    <div className={cn("flex flex-col gap-2", field.span === 2 && "sm:col-span-2")}>
      <label htmlFor={inputId} className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        {field.label}
        {"required" in field && field.required ? <span className="text-destructive"> *</span> : null}
      </label>

      {field.kind === "textarea" ? (
        <Textarea
          id={inputId}
          name={field.name}
          rows={field.rows ?? 5}
          defaultValue={text}
          placeholder={field.placeholder}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      ) : field.kind === "checkbox" ? (
        <input
          id={inputId}
          name={field.name}
          type="checkbox"
          defaultChecked={defaultValue === true}
          aria-describedby={describedBy}
          className="size-4 rounded-[4px] border-input accent-primary"
        />
      ) : field.kind === "select" ? (
        <select
          id={inputId}
          name={field.name}
          defaultValue={text}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30"
        >
          {field.required ? null : <option value="">None</option>}
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.kind === "image" ? (
        <ImageUploader name={field.name} defaultValue={text} folder={field.folder} label="" />
      ) : field.kind === "gallery" ? (
        <GalleryUploader
          name={field.name}
          defaultValue={Array.isArray(defaultValue) ? (defaultValue as string[]) : []}
          folder={field.folder}
        />
      ) : (
        <Input
          id={inputId}
          name={field.name}
          type={
            field.kind === "number"
              ? "number"
              : field.kind === "url"
                ? "url"
                : field.kind === "email"
                  ? "email"
                  : field.kind === "date"
                    ? "date"
                    : "text"
          }
          defaultValue={text}
          placeholder={"placeholder" in field ? field.placeholder : undefined}
          required={"required" in field ? field.required : undefined}
          min={field.kind === "number" ? field.min : undefined}
          max={field.kind === "number" ? field.max : undefined}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      )}

      {field.help ? (
        <p id={helpId} className="text-[12px] text-muted-foreground">
          {field.help}
        </p>
      ) : null}

      {errors?.length ? (
        <p id={errorId} role="alert" className="text-[12px] text-destructive">
          {errors.join(" ")}
        </p>
      ) : null}
    </div>
  )
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-primary px-6 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  )
}
