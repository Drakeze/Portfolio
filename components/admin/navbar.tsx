import Link from "next/link"

export const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/messages", label: "Messages" },
]

export function AdminNavbar() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 text-sm">
      {adminNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-1 hover:bg-neutral-800"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}