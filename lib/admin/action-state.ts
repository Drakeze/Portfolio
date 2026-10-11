/**
 * Client-safe half of the admin action contract.
 *
 * This deliberately imports nothing: EntityForm and DataTable are client
 * components, and importing the server-only `adminAction` module from them
 * drags `next/headers` into the browser bundle.
 */

declare const guarded: unique symbol

export type ActionState = {
  ok: boolean
  /** Form-level failure, shown in one banner above the submit button. */
  error?: string
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Record<string, string[] | undefined>
}

/**
 * A Server Action that is known to be admin-guarded.
 *
 * The brand is the point: only `adminAction()` in ./action can produce this
 * type, and EntityForm/DataTable only accept it. A hand-written `"use server"`
 * function is therefore a typecheck failure at the call site rather than a
 * silently unauthenticated mutation - which is exactly how all 20 actions in
 * this app ended up unguarded.
 */
export type AdminAction = ((state: ActionState, formData: FormData) => Promise<ActionState>) & {
  readonly [guarded]: true
}

export const IDLE: ActionState = { ok: false }
