import { listMessages } from "@/lib/domains/messages/service"

export const dynamic = "force-dynamic"

export default async function AdminMessagesPage() {
  const messages = await listMessages()

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Messages
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage incoming emails.
        </p>
      </section>

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Inbox</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Read</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id.toString()}
                  className={`border-t hover:bg-muted/30 ${
                    msg.read ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        msg.read
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {msg.read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {msg.name}
                  </td>
                  <td className="px-6 py-4">
                    {msg.email}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {msg.message}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
