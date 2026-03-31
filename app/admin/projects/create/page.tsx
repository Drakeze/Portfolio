import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createProject } from "@/lib/domains/projects/service"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

export default function CreateProjectPage() {
  async function createProjectAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const image = String(formData.get("image") ?? "").trim()

    if (!title || !description || !image) return

    await createProject({
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
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Create Project</h1>
        <p className="text-sm text-muted-foreground">Add a portfolio project card.</p>
      </section>

      <form action={createProjectAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <input name="title" required placeholder="Project title" className="rounded-md border bg-background px-3 py-2" />
        <input name="slug" placeholder="project-slug (optional)" className="rounded-md border bg-background px-3 py-2" />
        <input name="image" required placeholder="/projects/project-image.svg" className="rounded-md border bg-background px-3 py-2" />
        <input name="techStack" placeholder="Next.js, TypeScript, MongoDB" className="rounded-md border bg-background px-3 py-2" />
        <input name="liveUrl" type="url" placeholder="https://example.com" className="rounded-md border bg-background px-3 py-2" />
        <input name="githubUrl" type="url" placeholder="https://github.com/user/repo" className="rounded-md border bg-background px-3 py-2" />
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
          <input name="featured" type="checkbox" /> Featured project
        </label>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="Project description"
          className="md:col-span-2 rounded-md border bg-background px-3 py-2"
        />

        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/projects" className="rounded-md border px-4 py-2 text-sm">
            Cancel
          </Link>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">
            Save project
          </button>
        </div>
      </form>
    </main>
  )
}
