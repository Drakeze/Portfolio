import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { SubmitButton, ConfirmSubmitButton } from "@/components/admin/form-actions"
import { getSkillById, updateSkill } from "@/lib/domains/skills/service"
import type { SkillStatus } from "@/lib/domains/skills/types"

export const dynamic = "force-dynamic"

type EditSkillPageProps = { params: Promise<{ id: string }> }

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params
  const skill = await getSkillById(id)

  if (!skill) {
    notFound()
  }

  const currentSkill = skill

  async function updateSkillAction(formData: FormData) {
    "use server"

    const name = String(formData.get("name") ?? "").trim()
    const statusValue = String(formData.get("status") ?? currentSkill.status ?? "active") as SkillStatus

    if (!name) {
      return
    }

    const status: SkillStatus =
      statusValue === "learning" || statusValue === "archived" ? statusValue : "active"

    await updateSkill(id, {
      name,
      status,
    })

    revalidatePath("/admin/skills")
    revalidatePath("/about")
    redirect("/admin/skills")
  }

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Skill</h1>
        <p className="text-sm text-muted-foreground">Update status or rename this skill.</p>
      </section>

      <section className="rounded-lg border bg-background p-6">
        <form action={updateSkillAction} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-name">
              Skill Name
            </label>
            <input
              id="skill-name"
              name="name"
              defaultValue={currentSkill.name}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-status">
              Status
            </label>
            <select
              id="skill-status"
              name="status"
              defaultValue={currentSkill.status ?? "active"}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="active">Active</option>
              <option value="learning">Learning</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <Link href="/admin/skills" className="rounded-md border px-4 py-2 text-sm hover:bg-muted/40">
              Cancel
            </Link>
            <SubmitButton label="Save Changes" pendingLabel="Saving..." className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60" />
          </div>
        </form>
      </section>
    </main>
  )
}
