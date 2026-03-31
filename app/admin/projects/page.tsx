import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { ConfirmSubmitButton } from "@/components/admin/form-actions"
import { deleteProject, listProjects } from "@/lib/domains/projects/service"

export const dynamic = "force-dynamic"

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

async function deleteProjectAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/projects?status=error&message=Missing+project+id")
  }

  try {
    await deleteProject(id)
    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    redirect("/admin/projects?status=success&message=Project+deleted")
  } catch {
    redirect("/admin/projects?status=error&message=Failed+to+delete+project")
  }
}

export default async function AdminProjectsPage({ searchParams }: PageProps) {
  const projects = await listProjects()
  const { status, message } = await searchParams

  return (
    <main className="space-y-8">
      <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage project cards shown on your portfolio.</p>
        </div>
        <Link
          href="/admin/projects/create"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Add project
        </Link>
      </section>

      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

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
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${project.featured ? "bg-green-500/15 text-green-500" : "bg-muted text-muted-foreground"}`}
                    >
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
                        <ConfirmSubmitButton
                          label="Delete"
                          pendingLabel="Deleting..."
                          confirmMessage={`Delete project \"${project.title}\"? This cannot be undone.`}
                          className="text-red-500 hover:underline disabled:opacity-60"
                        />
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
