import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { FeedbackBanner } from "@/components/admin/feedback-banner"
import { ConfirmSubmitButton } from "@/components/admin/form-actions"
import { deleteCompany, listCompanies } from "@/lib/domains/companies/service"

export const dynamic = "force-dynamic"

type PageProps = { searchParams: Promise<{ status?: string; message?: string }> }

async function deleteCompanyAction(formData: FormData) {
  "use server"

  const id = String(formData.get("id") ?? "")
  if (!id) {
    redirect("/admin/companies?status=error&message=Missing+company+id")
  }

  try {
    await deleteCompany(id)
    revalidatePath("/admin/companies")
    revalidatePath("/projects/company")
    redirect("/admin/companies?status=success&message=Company+deleted")
  } catch {
    redirect("/admin/companies?status=error&message=Failed+to+delete+company")
  }
}

export default async function AdminCompaniesPage({ searchParams }: PageProps) {
  const companies = await listCompanies()
  const { status, message } = await searchParams

  return (
    <main className="space-y-8">
      <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Companies</h1>
          <p className="text-sm text-muted-foreground">Manage ventures and company initiatives.</p>
        </div>
        <Link
          href="/admin/companies/create"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Add company
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
                <th className="px-6 py-3">Tagline</th>
                <th className="px-6 py-3">Stack</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id.toString()} className="border-t hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium">{company.title}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{company.slug}</td>
                  <td className="px-6 py-4">{company.tagline}</td>
                  <td className="px-6 py-4">{company.techStack.join(", ") || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/companies/${company._id.toString()}/edit`} className="text-primary hover:underline">
                        Edit
                      </Link>
                      <form action={deleteCompanyAction}>
                        <input type="hidden" name="id" value={company._id.toString()} />
                        <ConfirmSubmitButton
                          label="Delete"
                          pendingLabel="Deleting..."
                          confirmMessage={`Delete company \"${company.title}\"? This cannot be undone.`}
                          className="text-red-500 hover:underline disabled:opacity-60"
                        />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No companies found. Create your first one.
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
