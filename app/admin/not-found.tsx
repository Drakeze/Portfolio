import Link from "next/link"

import { PageHeader } from "@/components/admin/shell"

/**
 * Without this, notFound() from an admin edit page rendered the public 404
 * outside the admin chrome.
 */
export default function AdminNotFound() {
  return (
    <>
      <PageHeader number="—" eyebrow="NOT FOUND" plain="No such " accent="record" />
      <p className="max-w-[60ch] text-muted-foreground">
        That record does not exist, or it was deleted in another tab.
      </p>
      <Link
        href="/admin"
        className="mt-8 inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-primary underline underline-offset-4 hover:no-underline"
      >
        Back to dashboard
      </Link>
    </>
  )
}
