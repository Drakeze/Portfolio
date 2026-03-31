import Link from "next/link"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

import { getProjectById, updateProject } from "@/lib/domains/projects/service"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) notFound()

  async function updateProjectAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const image = String(formData.get("image") ?? "").trim()

    if (!title || !description || !image) return

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
    redirect("/admin/projects")
  }

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Edit Project</h1>
      <form action={updateProjectAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <input name="title" required defaultValue={project.title} className="rounded-md border bg-background px-3 py-2" />
        <input name="slug" defaultValue={project.slug} className="rounded-md border bg-background px-3 py-2" />
        <input name="image" required defaultValue={project.image} className="rounded-md border bg-background px-3 py-2" />
        <input name="techStack" defaultValue={project.techStack.join(", ")} className="rounded-md border bg-background px-3 py-2" />
        <input name="liveUrl" type="url" defaultValue={project.liveUrl ?? ""} className="rounded-md border bg-background px-3 py-2" />
        <input name="githubUrl" type="url" defaultValue={project.githubUrl ?? ""} className="rounded-md border bg-background px-3 py-2" />
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
          <input name="featured" type="checkbox" defaultChecked={project.featured === true} /> Featured project
        </label>
        <textarea name="description" required rows={5} defaultValue={project.description} className="md:col-span-2 rounded-md border bg-background px-3 py-2" />

        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/projects" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">Save changes</button>
        </div>
      </form>
    </main>
  )
}
