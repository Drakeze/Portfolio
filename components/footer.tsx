import { siteConfig } from "@/lib/seo"
import { externalLinks } from "@/lib/site-links"
import { Github, Heart, Linkedin, Mail, MessageCircle, Store } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t px-6 py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              My Work
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Connect
            </Link>
          </div>

          <div className="flex gap-5">
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={externalLinks.ventures.creatorStore} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Store className="h-5 w-5" />
              <span className="sr-only">Creator Store</span>
            </a>
            <a href={siteConfig.socials.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </a>
            <a href={siteConfig.socials.patreon} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Patreon</span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
