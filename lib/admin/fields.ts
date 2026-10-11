import type { z } from "zod"

import type { ActionState } from "./action-state"

/**
 * Declarative description of one admin form field.
 *
 * The form is built from a config array rather than by introspecting the zod
 * schema, for three reasons:
 *  - the schemas are not a superset of the UI (skillInputSchema omits
 *    experienceDuration and blurb, both of which the UI writes), so
 *    introspection would silently drop live fields;
 *  - a schema carries no UI information - z.string() cannot tell you whether a
 *    value is an image, a URL or a comma-separated tag list;
 *  - unwrapping .optional().default().preprocess() chains is brittle code with
 *    exactly one caller.
 * Config and schema are both read by the same action, so any drift between
 * them surfaces as a zod error on first save instead of as lost data.
 */
export type FieldConfig =
  | { kind: "text" | "url" | "email"; name: string; label: string; placeholder?: string; required?: boolean; help?: string; span?: 1 | 2 }
  | { kind: "textarea"; name: string; label: string; rows?: number; placeholder?: string; required?: boolean; help?: string; span?: 1 | 2 }
  | { kind: "number"; name: string; label: string; min?: number; max?: number; required?: boolean; help?: string; span?: 1 | 2 }
  | { kind: "checkbox"; name: string; label: string; help?: string; span?: 1 | 2 }
  | { kind: "select"; name: string; label: string; options: readonly { value: string; label: string }[]; required?: boolean; help?: string; span?: 1 | 2 }
  | { kind: "tags"; name: string; label: string; placeholder?: string; required?: boolean; help?: string; span?: 1 | 2 }
  | { kind: "image"; name: string; label: string; folder?: string; help?: string; span?: 1 | 2 }
  | { kind: "gallery"; name: string; label: string; folder?: string; help?: string; span?: 1 | 2 }
  | { kind: "date"; name: string; label: string; required?: boolean; help?: string; span?: 1 | 2 }

/**
 * The one FormData parser.
 *
 * Every field in the config gets a key in the result, and a blank optional
 * field becomes `undefined` so setUnset() can $unset it. That is the fix for
 * the old inverted semantics, where blanking title/description/techStack was
 * silently ignored while blanking liveUrl/githubUrl did persist - mixed
 * behaviour inside a single object literal.
 */
export function valuesFrom(fields: readonly FieldConfig[], formData: FormData): Record<string, unknown> {
  const values: Record<string, unknown> = {}

  for (const field of fields) {
    const raw = formData.get(field.name)

    switch (field.kind) {
      case "checkbox":
        // An unchecked box sends nothing at all, which is a real `false`.
        values[field.name] = raw !== null
        break

      case "tags": {
        const list = String(raw ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
        values[field.name] = list.length > 0 ? list : undefined
        break
      }

      case "gallery": {
        // GalleryUploader serializes its list as newline-separated URLs.
        const list = String(raw ?? "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
        values[field.name] = list.length > 0 ? list : undefined
        break
      }

      case "number": {
        const text = String(raw ?? "").trim()
        if (text === "") {
          values[field.name] = undefined
        } else {
          const parsed = Number(text)
          values[field.name] = Number.isFinite(parsed) ? parsed : text
        }
        break
      }

      default: {
        const text = String(raw ?? "").trim()
        values[field.name] = text === "" ? undefined : text
      }
    }
  }

  return values
}

/** Turn a zod failure into per-field messages the form can render inline. */
export function zodErrors(error: z.ZodError): ActionState {
  const fieldErrors: Record<string, string[] | undefined> = {}

  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "_form"
    ;(fieldErrors[key] ??= []).push(issue.message)
  }

  return {
    ok: false,
    error: "Please fix the highlighted fields.",
    fieldErrors,
  }
}
