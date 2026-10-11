import "server-only"

import { redirect } from "next/navigation"

import { guardAdmin } from "@/lib/auth/admin"

import type { ActionState, AdminAction } from "./action-state"

export type { ActionState, AdminAction } from "./action-state"
export { IDLE } from "./action-state"

type Handler = (formData: FormData) => Promise<(ActionState & { redirectTo?: string }) | void>

/** redirect() and notFound() signal by throwing; they must not be swallowed. */
function isControlFlow(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false
  const digest = (error as { digest?: unknown }).digest
  return typeof digest === "string" && (digest.startsWith("NEXT_REDIRECT") || digest === "NEXT_NOT_FOUND")
}

export function adminAction(handler: Handler): AdminAction {
  return (async (_previous: ActionState, formData: FormData): Promise<ActionState> => {
    // Outside the try: guardAdmin redirects by throwing.
    await guardAdmin()

    let result: Awaited<ReturnType<Handler>>
    try {
      result = (await handler(formData)) ?? { ok: true }
    } catch (error) {
      if (isControlFlow(error)) throw error
      console.error("[adminAction]", error)
      return { ok: false, error: "Something went wrong. Nothing was saved." }
    }

    if (result.redirectTo) redirect(result.redirectTo)
    return result
  }) as AdminAction
}
