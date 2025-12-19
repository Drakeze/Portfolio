import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex gap-6">
            <a
                  href="https://github.com/Drakeze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://github.com/DrakezeWind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anthonyshead/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:asheadworking@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
