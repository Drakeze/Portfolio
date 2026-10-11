import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

/**
 * Public site chrome. This lives in a route group so /admin and the auth pages
 * are siblings that do not inherit it - previously the admin dashboard
 * rendered inside the portfolio's marketing nav and footer, giving it two
 * navbars. Route groups do not appear in URLs, so every path is unchanged.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </>
  )
}
