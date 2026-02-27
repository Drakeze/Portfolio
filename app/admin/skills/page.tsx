import Link from "next/link"
import { revalidatePath } from "next/cache"

import { createSkill, deleteSkill, listSkills, updateSkill } from "@/lib/domains/skills/service"
import type { SkillStatus } from "@/lib/domains/skills/types"

export const dynamic = "force-dynamic"

async function createSkillAction(formData: FormData) {
  "use server"

  const name = String(formData.get("name") ?? "").trim()
  const statusValue = String(formData.get("status") ?? "active") as SkillStatus

  if (!name) {
    return
  }

  const status: SkillStatus =
    statusValue === "learning" || statusValue === "archived" ? statusValue : "active"

  await createSkill({ name, status })

  revalidatePath("/admin/skills")
  revalidatePath("/about")
}

async function archiveSkillAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    return
  }

  await updateSkill(id, { status: "archived" })

  revalidatePath("/admin/skills")
  revalidatePath("/about")
}

async function deleteSkillAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    return
  }

  await deleteSkill(id)

  revalidatePath("/admin/skills")
  revalidatePath("/about")
}

function getStatusStyles(status: SkillStatus) {
  if (status === "active") {
    return "bg-green-100 text-green-700"
  }

  if (status === "learning") {
    return "bg-blue-100 text-blue-700"
  }

  return "bg-yellow-100 text-yellow-700"
}

export default async function AdminSkillsPage() {
  const skills = await listSkills()

  return (
    <main className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground">Create new skills or manage existing ones.</p>
      </section>

      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">Create New Skill</h2>

        <form action={createSkillAction} className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="skill-name">
              Skill Name
            </label>
            <input
              id="skill-name"
              name="name"
              type="text"
              required
              placeholder="React"
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
              defaultValue="active"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="active">Active</option>
              <option value="learning">Learning</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90" type="submit">
              Save Skill
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Skills</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Skill Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => {
                const status = skill.status ?? "active"

                return (
                  <tr key={skill._id.toString()} className="border-t hover:bg-muted/30">
                    <td className="px-6 py-4 font-mono text-xs">{skill._id.toString().slice(-6)}</td>
                    <td className="px-6 py-4">{skill.name}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-4">
                        <Link href={`/admin/skills/${skill._id.toString()}/edit`} className="text-sm font-medium text-primary hover:underline">
                          Edit
                        </Link>

                        {status !== "archived" ? (
                          <form action={archiveSkillAction}>
                            <input type="hidden" name="id" value={skill._id.toString()} />
                            <button className="text-sm font-medium text-yellow-600 hover:underline" type="submit">
                              Archive
                            </button>
                          </form>
                        ) : null}

                        <form action={deleteSkillAction}>
                          <input type="hidden" name="id" value={skill._id.toString()} />
                          <button className="text-sm font-medium text-red-600 hover:underline" type="submit">
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
