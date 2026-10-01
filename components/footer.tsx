import { siteConfig } from "@/lib/seo"
import { externalLinks } from "@/lib/site-links"
import { Mail } from "lucide-react"
import type { ElementType } from "react"
import { SiGithub, SiTwitch, SiYoutube } from "react-icons/si"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

type SocialLink = {
  key: string
  label: string
  href: string
  Icon: ElementType
}

const SOCIAL_LINKS: SocialLink[] = [
  { key: "github", label: "GitHub", href: externalLinks.socials.github, Icon: SiGithub },
  { key: "linkedin", label: "LinkedIn", href: externalLinks.socials.linkedin, Icon: LinkedInIcon },
  ...(externalLinks.socials.twitch
    ? [{ key: "twitch", label: "Twitch", href: externalLinks.socials.twitch, Icon: SiTwitch as ElementType }]
    : []),
  ...(externalLinks.socials.youtube
    ? [{ key: "youtube", label: "YouTube", href: externalLinks.socials.youtube, Icon: SiYoutube as ElementType }]
    : []),
  { key: "email", label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-20 py-7 flex items-center justify-between gap-4 flex-wrap">
        {/* Left: name + copyright */}
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-[14px] text-foreground">Anthony Shead</span>
          <span className="font-mono text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} · Los Angeles
          </span>
        </div>

        {/* Right: social icon buttons */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ key, label, href, Icon }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
            >
              <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
