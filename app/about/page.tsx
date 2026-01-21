import type { Metadata } from "next"
import Link from "next/link"
import {
  Award,
  Code,
  Download,
  Github,
  Linkedin,
  Mail,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/seo"

const aboutParagraphs = [
  "Hi, I’m Anthony Shead — a full-stack developer who loves turning ideas into intuitive products. I’m steadily working toward polyglot-level proficiency while completing the IBM Full-Stack JavaScript Developer certification and expanding the service catalog for my studio, Soren Tech.",
  "Right now my toolkit leans on Next.js, TypeScript, Tailwind CSS, and MongoDB, and I’m actively leveling up my backend automation and cloud workflows with Python, Redis, Docker, and AWS. Every engagement is an opportunity to blend user-centered thinking with reliable engineering.",
  "Outside of code you’ll find me in the pool, at the gym, or exploring new games — all outlets that keep me creative and balanced. If you’d like to collaborate, let’s connect! I run two GitHub accounts (Drakeze and DrakezeWinds) so feel free to explore both.",
]

const experiences = [
  {
    role: "Founder & Full-Stack Developer",
    company: "Soren Tech",
    period: "2025 - Present",
    points: [
      "Launched a studio focused on building professional websites and APIs that align with client goals.",
      "Design and maintain a growing suite of turnkey full-stack products that can be customized per engagement.",
      "Lead every project phase, from UX strategy in Next.js and Tailwind CSS to backend architecture with Node.js and MongoDB.",
      "Own deployment, hosting, and integrations via platforms such as Vercel, Supabase, and Stripe.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Client Projects",
    period: "2023 - 2024",
    points: [
      "Delivered responsive web experiences for entrepreneurs and small businesses across multiple industries.",
      "Built bespoke interfaces with React, Next.js, and Tailwind CSS to reflect each brand’s voice and goals.",
      "Managed projects end-to-end — discovery, roadmaps, launch, and ongoing support — while keeping communication clear.",
    ],
  },
  {
    role: "Junior Full-Stack Developer (Contributor)",
    company: "D-Sports Ecosystem (Startup Project)",
    period: "2024 - 2025",
    points: [
      "Collaborated with the founding team on early prototypes for a sports and technology platform.",
      "Tackled junior-level full-stack tickets that strengthened fundamentals in React, Node.js, and data modeling.",
      "Completed initial GitHub projects, certifications, and agile sprints while learning professional team workflows.",
    ],
  },
]

const certifications = [
  {
    title: "API Integration – End to End Web Development",
    provider: "Board Infinity",
    status: "Completed",
    detail: "86%",
  },
  {
    title: "Getting Started with Git and GitHub",
    provider: "IBM",
    status: "Completed",
    detail: "84.28%",
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    provider: "IBM",
    status: "Completed",
    detail: "88.57%",
  },
  {
    title: "Introduction to Software Engineering",
    provider: "IBM",
    status: "Completed",
    detail: "85.90%",
  },
]

const certificationsInProgress = [
  {
    title: "IBM Full-Stack JavaScript Developer",
    provider: "IBM / Coursera",
    status: "In Progress",
  },
]

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about my experience, skills, and certifications.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-12" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {experiences.map((item) => (
                <div key={`${item.company}-${item.role}`}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold">{item.role}</h3>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.period}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SkillsSection />

        <div className="border-t pt-12 space-y-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Certifications</h2>
            </div>
            <ul className="space-y-4 mb-6">
              {certifications.map((cert) => (
                <li key={cert.title} className="text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{cert.title}</p>
                      <p className="text-xs">
                        {cert.provider} · {cert.status}
                        {cert.detail ? ` · ${cert.detail}` : ""}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {certificationsInProgress.map((cert) => (
                <li key={cert.title} className="text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{cert.title}</p>
                      <p className="text-xs">
                        {cert.provider} · {cert.status}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
