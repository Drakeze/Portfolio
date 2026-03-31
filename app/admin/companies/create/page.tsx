import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { SubmitButton } from "@/components/admin/form-actions"
import { createCompany } from "@/lib/domains/companies/service"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

export default async function CreateCompanyPage({ searchParams }: PageProps) {
  const { status, message } = await searchParams

  async function createCompanyAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const tagline = String(formData.get("tagline") ?? "").trim()
    const longDescription = String(formData.get("longDescription") ?? "").trim()

    if (!title || !tagline || !longDescription) {
      redirect("/admin/companies/create?status=error&message=Title%2C+tagline%2C+and+description+are+required")
    }

    try {
      await createCompany({
        title,
        slug: slugify(String(formData.get("slug") ?? "").trim() || title),
        tagline,
        longDescription,
        gallery: String(formData.get("gallery") ?? "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        techStack: String(formData.get("techStack") ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        liveUrl: String(formData.get("liveUrl") ?? "").trim() || undefined,
        githubUrl: String(formData.get("githubUrl") ?? "").trim() || undefined,
      })

      revalidatePath("/admin/companies")
      revalidatePath("/projects/company")
      redirect("/admin/companies?status=success&message=Company+created")
    } catch {
      redirect("/admin/companies/create?status=error&message=Failed+to+create+company")
    }
  }

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Create Company</h1>

      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <form action={createCompanyAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm">Title</label>
          <input id="title" name="title" required placeholder="Company title" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm">Slug</label>
          <input id="slug" name="slug" placeholder="company-slug (optional)" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="tagline" className="text-sm">Tagline</label>
          <input id="tagline" name="tagline" required placeholder="Tagline" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="techStack" className="text-sm">Tech stack</label>
          <input id="techStack" name="techStack" placeholder="Next.js, TypeScript, MongoDB" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="liveUrl" className="text-sm">Live URL</label>
          <input id="liveUrl" name="liveUrl" type="url" placeholder="https://example.com" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="githubUrl" className="text-sm">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/org" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="gallery" className="text-sm">Gallery image URLs/paths (one per line)</label>
          <textarea id="gallery" name="gallery" rows={4} placeholder="/projects/image-1.svg" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="longDescription" className="text-sm">Description</label>
          <textarea id="longDescription" name="longDescription" required rows={6} placeholder="Long description" className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/companies" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
          <SubmitButton
            label="Save company"
            pendingLabel="Saving..."
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          />
        </div>
      </form>
    </main>
  )
}
