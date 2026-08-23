import { siteConfig } from "@/lib/seo"
import { externalLinks } from "@/lib/site-links"
import { Building2, Radio, Store } from "lucide-react"
import type { IconType } from "react-icons"
import { SiDailydotdev, SiDiscord, SiLinktree, SiPatreon, SiX } from "react-icons/si"
import Link from "next/link"

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "My Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: externalLinks.ventures.blog, label: "Blog", external: true },
  { href: "/contact", label: "Connect" },
]

const socialLinksPrimary: { key: string; label: string; href: string; Icon: IconType }[] = [
  { key: "github", label: "GitHub", href: siteConfig.socials.github, Icon: GitHubMark },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInMark },
  { key: "twitter", label: "X", href: siteConfig.socials.twitter, Icon: SiX },
  { key: "discord", label: "Discord", href: siteConfig.socials.discord, Icon: SiDiscord },
  { key: "patreon", label: "Patreon", href: siteConfig.socials.patreon, Icon: SiPatreon },
]

const socialLinksSecondary: { key: string; label: string; href: string; Icon: IconType }[] = [
  { key: "dailydotdev", label: "daily.dev", href: siteConfig.socials.dailydotdev, Icon: SiDailydotdev },
  { key: "linktree", label: "Linktree", href: siteConfig.socials.linktree, Icon: SiLinktree },
  { key: "creatorStore", label: "Creator Store", href: externalLinks.ventures.creatorStore, Icon: Store },
  { key: "anakonis", label: "Anakonis (Streaming)", href: externalLinks.ventures.anakonis, Icon: Radio },
  { key: "sorenTech", label: "Soren Lab", href: externalLinks.ventures.sorenTech, Icon: Building2 },
]

function SocialIconRow({ links }: { links: typeof socialLinksPrimary }) {
  return (
    <div className="flex gap-3">
      {links.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className="text-accent-foreground/70 transition-colors hover:text-accent-foreground"
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-accent px-6 py-8 text-accent-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-medium">
              Losing sleep over the goals and dreams I&apos;m chasing. Up late, putting in the hours, trying to get where I want to be.
            </p>
            <p className="mt-3 text-sm text-accent-foreground/70">Thanks for being part of the journey.</p>
          </div>

          <div className="flex gap-12">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-foreground/70 transition-colors hover:text-accent-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-accent-foreground/70 transition-colors hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex flex-col gap-3">
              <SocialIconRow links={socialLinksPrimary} />
              <SocialIconRow links={socialLinksSecondary} />
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-accent-foreground/70">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
