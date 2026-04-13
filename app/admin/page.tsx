import Link from "next/link"

import { ChangePasswordForm } from "@/components/admin/change-password-form"
import { countCompanies } from "@/lib/domains/companies/service"
import { listMessages } from "@/lib/domains/messages/service"
import { countProjects } from "@/lib/domains/projects/service"
import { listSkills } from "@/lib/domains/skills/service"
import { hasStoredAdminPassword } from "@/src/lib/admin-session"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const [projects, companies, skills, recentMessages, usesStoredPassword] = await Promise.all([
    countProjects(),
    countCompanies(),
    listSkills(),
    listMessages(),
    hasStoredAdminPassword(),
  ])

  const unreadCount = recentMessages.filter((message) => !message.read).length

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of portfolio content and inbound messages.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Projects", value: projects },
          { label: "Companies", value: companies },
          { label: "Skills", value: skills.length },
          { label: "Unread Messages", value: unreadCount },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-sm font-medium">Recent Messages</h2>
          <Link href="/admin/messages" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.slice(0, 5).map((message) => (
                <tr key={message._id.toString()} className="border-t hover:bg-muted/20">
                  <td className="px-6 py-4">{message.name}</td>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4">{new Date(message.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        message.read ? "bg-muted text-muted-foreground" : "bg-primary/15 text-primary"
                      }`}
                    >
                      {message.read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/messages/${message._id.toString()}/edit`} className="text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {recentMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No messages yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Admin Security</h2>
          <p className="text-sm text-muted-foreground">
            Current password source: {usesStoredPassword ? "MongoDB" : "environment fallback"}
          </p>
        </div>
        <ChangePasswordForm />
      </section>
    </main>
  )
}
