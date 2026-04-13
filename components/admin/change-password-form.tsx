"use client"

import { FormEvent, useState } from "react"

type FormState = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const initialFormState: FormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

export function ChangePasswordForm() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/session", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const payload = (await response.json().catch(() => null)) as { error?: string; success?: boolean } | null

      if (!response.ok || !payload?.success) {
        setError(payload?.error ?? "Unable to update password.")
        return
      }

      setForm(initialFormState)
      setSuccess("Admin password updated successfully.")
    } catch {
      setError("Unable to update password.")
    } finally {
      setLoading(false)
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Change Admin Password</h2>
        <p className="text-sm text-muted-foreground">
          Save a new admin password to MongoDB. Once saved, sign-in will use the stored password instead of the fallback
          `.env` value.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Current password</span>
          <input
            className="w-full rounded-md border bg-background px-3 py-2"
            type="password"
            autoComplete="current-password"
            value={form.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">New password</span>
          <input
            className="w-full rounded-md border bg-background px-3 py-2"
            type="password"
            autoComplete="new-password"
            value={form.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            minLength={12}
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">Confirm new password</span>
          <input
            className="w-full rounded-md border bg-background px-3 py-2"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            minLength={12}
            required
          />
        </label>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

      <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" disabled={loading} type="submit">
        {loading ? "Saving..." : "Update password"}
      </button>
    </form>
  )
}
