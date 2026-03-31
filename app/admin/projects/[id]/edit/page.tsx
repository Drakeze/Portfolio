import Link from "next/link"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { SubmitButton } from "@/components/admin/form-actions"
import { getProjectById, updateProject } from "@/lib/domains/projects/service"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ status?: string; message?: string }>
}

export default async function EditProjectPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const project = await getProjectById(id)
  const { status, message } = await searchParams

  if (!project) notFound()

  async function updateProjectAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const image = String(formData.get("image") ?? "").trim()

    if (!title || !description || !image) {
      redirect(`/admin/projects/${id}/edit?status=error&message=Title%2C+description+and+image+are+required`)
    }

    try {
      await updateProject(id, {
        title,
        slug: slugify(String(formData.get("slug") ?? "").trim() || title),
        description,
        image,
        techStack: String(formData.get("techStack") ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        liveUrl: String(formData.get("liveUrl") ?? "").trim() || undefined,
        githubUrl: String(formData.get("githubUrl") ?? "").trim() || undefined,
        featured: String(formData.get("featured") ?? "") === "on",
      })

      revalidatePath("/admin/projects")
      revalidatePath("/projects")
      redirect("/admin/projects?status=success&message=Project+updated")
    } catch {
      redirect(`/admin/projects/${id}/edit?status=error&message=Failed+to+update+project`)
    }
  }

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Edit Project</h1>

      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <form action={updateProjectAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm">Title</label>
          <input id="title" name="title" required defaultValue={project.title} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm">Slug</label>
          <input id="slug" name="slug" defaultValue={project.slug} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm">Image path</label>
          <input id="image" name="image" required defaultValue={project.image} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="techStack" className="text-sm">Tech stack</label>
          <input id="techStack" name="techStack" defaultValue={project.techStack.join(", ")} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="liveUrl" className="text-sm">Live URL</label>
          <input id="liveUrl" name="liveUrl" type="url" defaultValue={project.liveUrl ?? ""} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="githubUrl" className="text-sm">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" type="url" defaultValue={project.githubUrl ?? ""} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
          <input name="featured" type="checkbox" defaultChecked={project.featured === true} /> Featured project
        </label>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="text-sm">Description</label>
          <textarea id="description" name="description" required rows={5} defaultValue={project.description} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/projects" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
          <SubmitButton
            label="Save changes"
            pendingLabel="Saving..."
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          />
        </div>
      </form>
    </main>
  )
}
