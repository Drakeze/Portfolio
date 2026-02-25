export default function AdminPage() {
  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your portfolio system and activity.
        </p>
      </section>

      {/* Metrics */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Projects", value: 0 },
          { label: "Companies", value: 0 },
          { label: "Messages", value: 0 },
          { label: "New Messages", value: 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-background p-5"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Activity Chart Placeholder */}
      <section className="rounded-lg border bg-background p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium">Activity (Last 30 Days)</h2>
        </div>
        <div className="flex h-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Chart placeholder
        </div>
      </section>

      {/* Recent Messages */}
      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Recent Messages</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-muted/30">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">john@email.com</td>
                <td className="px-6 py-4">Project Inquiry</td>
                <td className="px-6 py-4">Jan 10, 2026</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Unread
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-primary hover:underline">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
