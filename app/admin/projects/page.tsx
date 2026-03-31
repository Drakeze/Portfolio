import Link from "next/link"
import { revalidatePath } from "next/cache"

import { deleteProject, listProjects } from "@/lib/domains/projects/service"

export const dynamic = "force-dynamic"

async function deleteProjectAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) return

  await deleteProject(id)
  revalidatePath("/admin/projects")
  revalidatePath("/projects")
}

export default async function AdminProjectsPage() {
  const projects = await listProjects()

  return (
    <main className="space-y-8">
      <section className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage project cards shown on your portfolio.</p>
        </div>
        <Link href="/admin/projects/create" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Add project
        </Link>
      </section>

      <section className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Stack</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id.toString()} className="border-t hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{project.slug}</td>
                  <td className="px-6 py-4">{project.techStack.join(", ") || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${project.featured ? "bg-green-500/15 text-green-500" : "bg-muted text-muted-foreground"}`}>
                      {project.featured ? "Featured" : "Standard"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/projects/${project._id.toString()}/edit`} className="text-primary hover:underline">
                        Edit
                      </Link>
                      <form action={deleteProjectAction}>
                        <input type="hidden" name="id" value={project._id.toString()} />
                        <button className="text-red-500 hover:underline" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No projects found. Create your first one.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
