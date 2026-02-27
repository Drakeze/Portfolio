"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/lib/seo"
import { Github, Linkedin, Mail, Twitter, Building2, Leaf, Home } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <div className="w-16 h-1 bg-foreground mb-12"></div>

        <div className="space-y-8">
          <GetInTouchCard />
          <OthersCard />
        </div>
      </div>
    </main>
  )
}
function GetInTouchCard() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setSubmitError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          I’m always interested in hearing about new projects and opportunities. Whether you have a question or just
          want to say hi, feel free to reach out.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 bg-background"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 bg-background"
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full border rounded-md px-4 py-2 bg-background"
          />

          <Button type="submit" size="lg" disabled={loading}>
            <Mail className="h-5 w-5 mr-2" />
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {success && (
            <p className="text-sm text-green-500">Message sent successfully.</p>
          )}
          {submitError && (
            <p className="text-sm text-red-500">{submitError}</p>
          )}
        </form>

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
          </div>
        </div>
      </div>
    </Card>
  )
}
function OthersCard() {
  return (
    <Card className="p-8">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Explore the projects, organizations, and curated resources I build and maintain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <a
            href="https://soren.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full justify-start items-start h-auto py-6 gap-4 whitespace-normal text-left">
              <Building2 className="h-5 w-5 mt-1" />
              <div className="flex flex-col">
                <p className="font-medium">Soren Tech</p>
                <p className="text-sm text-muted-foreground">
                  Making programming a art form through innovative tools and resources
                </p>
              </div>
            </Button>
          </a>

          <a
            href="https://earthplus.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full justify-start items-start h-auto py-6 gap-4 whitespace-normal text-left">
              <Leaf className="h-5 w-5 mt-1" />
              <div className="flex flex-col">
                <p className="font-medium">Earth Plus</p>
                <p className="text-sm text-muted-foreground">
                  Empowering individuals and organizations to take meaningful action toward a more sustainable future through technology, visibility, and community engagement.
                </p>
              </div>
            </Button>
          </a>

          <a
            href="https://yourshop.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full justify-start items-start h-auto py-6 gap-4 whitespace-normal text-left">
              <Home className="h-5 w-5 mt-1" />
              <div className="flex flex-col">
                <p className="font-medium">Shop</p>
                <p className="text-sm text-muted-foreground">
                  Products and templates I have worked on and will hopefully help you build your next projects ,Obsidian Vault faster and better
                </p>
              </div>
            </Button>
          </a>

          <a
            href="https://linktr.ee/yourresources"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full justify-start items-start h-auto py-6 gap-4 whitespace-normal text-left">
              <Mail className="h-5 w-5 mt-1" />
              <div className="flex flex-col">
                <p className="font-medium">Resources</p>
                <p className="text-sm text-muted-foreground">
                  Helpful tools, guides, and recommendations
                </p>
              </div>
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
}
