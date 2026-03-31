"use client"

import * as React from "react"
import { Building2, Github, Leaf, Linkedin, Mail, Package, Twitter, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/seo"
import { externalLinks } from "@/lib/site-links"

const connectLinks = [
  { href: siteConfig.socials.github, label: "GitHub", icon: Github },
  { href: siteConfig.socials.githubAlt, label: "GitHub (Alt)", icon: Github },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteConfig.socials.twitter, label: "X", icon: Twitter },
]

const ventureLinks = [
  {
    href: externalLinks.ventures.sorenTech,
    title: "Soren Tech",
    description: "Custom web products, systems, and software delivery services.",
    icon: Building2,
  },
  {
    href: externalLinks.ventures.earthPlus,
    title: "Earth Plus",
    description: "Technology and community work focused on sustainable outcomes.",
    icon: Leaf,
  },
  {
    href: externalLinks.ventures.creatorStore,
    title: "Creator Store",
    description: "Final destination for templates, toolkits, and digital products.",
    icon: Package,
  },
  {
    href: externalLinks.ventures.resources,
    title: "Resources",
    description: "Curated links, docs, and tools I actively recommend.",
    icon: Wrench,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="max-w-2xl text-muted-foreground">
            Reach out for collaborations, consulting, or product opportunities. I usually reply within two business
            days.
          </p>
        </header>

        <GetInTouchCard />
        <CreatorLinksCard />
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setSubmitError("Message failed to send. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="space-y-6 p-8">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input type="text" placeholder="Your Name" autoFocus value={name} onChange={(e) => setName(e.target.value)} required />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Textarea
          placeholder="Tell me about your project"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
        />

        <Button type="submit" disabled={loading}>
          <Mail className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Send Message"}
        </Button>

        {success ? <p className="text-sm text-green-500">Message sent successfully.</p> : null}
        {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
      </form>

      <div className="border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">Connect</h2>
        <div className="flex flex-wrap gap-5">
          {connectLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}

function CreatorLinksCard() {
  return (
    <Card className="space-y-6 p-8">
      <h2 className="text-xl font-semibold">Projects & Creator Ecosystem</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {ventureLinks.map((link) => (
          <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="h-auto w-full items-start justify-start gap-4 whitespace-normal py-5 text-left"
            >
              <link.icon className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <span className="block font-medium">{link.title}</span>
                <span className="text-sm text-muted-foreground">{link.description}</span>
              </span>
            </Button>
          </a>
        ))}
      </div>
    </Card>
  )
}
