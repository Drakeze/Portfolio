import { listCompanies } from "@/lib/domains/companies/service"
type Company = {
  _id: string
  name: string
  description: string
  techStack: string
  websiteUrl?: string
  githubUrl?: string
  images: string[]
  status: "active" | "archived"
  createdAt: Date
  updatedAt: Date
}

export default async function AdminCompaniesPage() {
  const companies = await listCompanies()

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Companies
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new companies or manage existing ones.
        </p>
      </section>

      {/* Create New Company */}
      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">
          Create New Company
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Company Name
            </label>
            <input
              type="text"
              placeholder="My Awesome Company"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Tech Stack
            </label>
            <input
              type="text"
              placeholder="Next.js, TypeScript, MongoDB"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              GitHub Organization
            </label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Long Description
            </label>
            <textarea
              placeholder="Detailed description about the company, mission, initiatives, and technical direction..."
              rows={6}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Company Images
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="company-image"
                className="cursor-pointer rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/40"
              >
                Choose Images
              </label>

              <span className="text-sm text-muted-foreground">
                No files selected
              </span>
            </div>

            <input
              id="company-image"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
            Save Company
          </button>
        </div>
      </section>

      {/* Existing Companies */}
      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Companies</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Tech Stack</th>
                <th className="px-6 py-3">Website</th>
                <th className="px-6 py-3">GitHub</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id} className="border-t hover:bg-muted/30">
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">{company.techStack}</td>
                  <td className="px-6 py-4">{company.websiteUrl || "—"}</td>
                  <td className="px-6 py-4">{company.githubUrl || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        company.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                    <button className="text-sm font-medium text-yellow-600 hover:underline">
                      Archive
                    </button>
                    <button className="text-sm font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}