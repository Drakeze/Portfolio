import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/lib/seo"
import { Github, Linkedin, Mail, Twitter, Monitor, Globe, Home } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Contact - ${siteConfig.name}`,
  description: "Get in touch to collaborate or discuss new opportunities.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <div className="w-16 h-1 bg-foreground mb-12"></div>

        <div className="space-y-8">
          <GetInTouchCard />
          <WorkAndCompaniesCard />
          <ResourcesAndShopCard />
        </div>
      </div>
    </main>
  )
}
function GetInTouchCard() {
  return (
    <Card className="p-8">
        <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I’m always interested in hearing about new projects and opportunities. Whether you have a question or just
              want to say hi, feel free to reach out.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Connect</h2>
              <div className="flex gap-6">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={siteConfig.socials.githubAlt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://x.com/SorenIdeas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>
      </Card>
  )
}
function WorkAndCompaniesCard() {
  return (
    <Card className="p-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Work & Initiatives</h2>
        <p className="text-muted-foreground leading-relaxed">
          {/* short philosophy-driven description */}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="outline" asChild>
            <a href="https://SorenLab.com" target="_blank" rel="noopener noreferrer">
              <Monitor className="h-4 w-4 mr-2" />
              Visit Soren Tech
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href="https://earthplus.org" target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4 mr-2" />
              Learn About Earth Plus
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
function ResourcesAndShopCard() {
  return (
    <Card className="p-8">
        <div className="space-y-4">
        <h2 className="text-xl font-semibold">Resources & Templates</h2>
        <p className="text-muted-foreground leading-relaxed">
          {/* explain what you share and why */}
        </p>

        <p className="text-sm text-muted-foreground">
          Patreon members get access to many of these resources at no additional cost.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="outline" asChild>
            <a href="/shop">Browse Resources</a>
          </Button>

          <Button variant="outline" asChild>
            <a href="/shop">
              <Home className="h-4 w-4 mr-2" />
              Visit the Shop
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
