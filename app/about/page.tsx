import {
  Award,
  Download
} from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/lib/seo"

const aboutParagraphs = [
  "Hi, I’m Anthony Shead, a self-taught full-stack developer based in Los Angeles, California. I’m driven by curiosity, structure, and the process of turning ideas into real, working systems. My long-term goal is to become a polyglot software engineer, building thoughtful products while continuously expanding how I understand technology end to end.",
"I originally found my way into coding through gaming. What started as customizing files and optimizing performance in Team Fortress 2 eventually turned into learning C++, experimenting with small programs, and realizing I could build tools for myself. That curiosity carried me from frontend development into full-stack engineering, and it hasn’t stopped since. I love that software has no ceiling; there’s always something new to learn, improve, or reimagine.",
"What really made development click for me was seeing code as architecture. File structures, systems, and workflows felt similar to how buildings are designed, everything connects, and every decision shapes the whole. That mindset still guides how I approach projects today: I focus on building clear systems, not just writing code.",
"Outside of development, I spend time at the gym, in the pool (I’ve been swimming for over 13 years), streaming games, and experimenting in the kitchen, especially with Asian cuisine. Fitness taught me consistency. Gaming taught me systems thinking. Both carry directly into how I learn and build as an engineer.",
"I grew up in an African American household surrounded mostly by adults, which pushed me toward independence early on. Being largely self-taught, I’ve learned to hold myself accountable, showing up daily, studying, building, and improving even when no one is watching.",
"Today, I’m working toward full-stack and software engineering roles while building my own studio, Soren Tech, focused on custom websites and APIs. I’m also developing Earth Plus, a longer-term project centered on blending technology with environmental responsibility. My work is driven by one core belief: consistency beats talent. Progress comes from systems, discipline, and showing up every day.",
"If you’d like to collaborate or follow along, feel free to connect."

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
