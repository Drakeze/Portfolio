// components/footer.tsx
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button" // optional if you want the button style

export function Footer() {
  const socials = [
    { href: "https://github.com/Drakeze", label: "GitHub", icon: Github },
    { href: "https://www.github.com/DrakezeWind", label: "GitHub Alt", icon: Github },
    { href: "https://www.linkedin.com/in/anthonyshead/", label: "LinkedIn", icon: Linkedin },
    { href: "mailto:asheadworking@gmail.com", label: "Email", icon: Mail },
  ]

  return (
    <footer className="border-t border-border bg-background py-20 px-6 text-center mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Let&apos;s Work Together
        </h2>

        {/* Subheading */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities and collaborations. Let&apos;s discuss how we
          can bring your ideas to life.
        </p>

        {/* Contact button */}
        <Button asChild size="lg" aria-label="Get in touch via email">
          <Link href="mailto:asheadworking@gmail.com">
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Link>
        </Button>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {socials.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-sm text-muted-foreground mt-10">
          © {new Date().getFullYear()} Anthony Shead — Built with Next.js, Tailwind, and passion.
        </p>
      </div>
    </footer>
  )
}
