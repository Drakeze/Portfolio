import { Award, Download } from "lucide-react"
import type { Metadata } from "next"

import SkillsSection from "@/components/sections/skillsection"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPublicCertifications, getPublicSkills } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

const aboutParagraphs = [
"I'm Anthony Shead, a full-stack developer in California focused on building structured, scalable, and meaningful digital systems with modern web tools.",

  "I did not take a traditional path into programming. I started by pulling things apart, modding games, tweaking configs, and learning through trial, error, and curiosity. Over time, that became the way I approach almost everything: deconstruct the system, understand how it works, then rebuild it with more intention.",

  "Programming really clicked for me when I started seeing it as architecture. Code is not just about making something function. It is about designing how everything fits together, how the structure supports the experience, how data moves, how components connect, and how the system holds up as it grows.",

  "That way of thinking has shaped how I build today. I care about clarity, maintainability, and long-term scalability. I try to avoid rushing into quick fixes when the stronger answer is usually a better structure, a cleaner flow, or a system that is easier to understand later.",

  "Right now, I work across a modern full-stack setup with tools like Next.js, React, TypeScript, MongoDB, and Prisma. I am also building real-world product layers such as authentication, payments, email systems, APIs, dashboards, and multi-app project structures.",

  "A lot of my current work revolves around connected systems. I am building a portfolio ecosystem with multiple apps under one larger structure, including a blog, creator-focused tools, service pages, data systems, and internal project workflows. Each project is not just a standalone build. It is part of a larger foundation I am learning to design, connect, and scale.",

  "Alongside my personal development work, I am building Soren Lab, a development-focused brand centered on full-stack websites, digital systems, and client-ready solutions. The goal is not just to build basic websites. It is to help people turn their ideas, stories, and business goals into digital systems that feel clear, intentional, and built to grow.",

  "I see websites as more than pages on a screen. A strong website should communicate the work behind the brand. It should show direction, trust, effort, and purpose. That is why I like approaching web development with an architectural mindset: planning the structure, shaping the visual direction, and making sure the final product supports both the client and the people using it.",

  "Consistency is a big part of how I work. I have been swimming for over thirteen years and still train regularly, and that discipline carries over into development. I care about steady progress, strong fundamentals, and long-term effort. I try to write software the same way: structured, repeatable, and always improving.",

  "Long-term, I want to become a polyglot full-stack engineer. I want to understand multiple languages, paradigms, tools, and architectures well enough to choose the right solution for the problem instead of forcing one approach onto everything. I care more about depth than shortcuts, and more about building systems that last than rushing something together.",

  "Outside of day-to-day development, I am also laying the groundwork for Earth Plus, a long-term project focused on sustainability, renewal, and real-world impact. I believe well-designed systems, whether technical, creative, or personal, can create meaningful change when they are built with intention."
]
const experiences = [
  {
    role: "Front-End / Full-Stack Developer",
    company: "D-Sports",
    period: "2025 | 6 months",
    points: [
      "Contributed to the development of a sports card trading web/mobile application with pack-opening, card collection, quests, and achievement-based reward systems.",
      "Built and improved user-facing features for interactive sports card experiences, including UI flows for collecting, trading, and unlocking digital cards.",
      "Worked on responsive layouts, reusable components, and application interface structure using modern JavaScript and TypeScript workflows.",
      "Assisted with connecting front-end features to backend/API functionality for app data, user actions, and card-related features.",
      "Helped debug, test, and improve application features during active startup development.",
      "Gained hands-on experience working in a fast-moving startup environment with changing product priorities.",
    ],
  },
  {
    role: "Protein Shake Bar Associate",
    company: "Crunch Fitness",
    period: "2022 | 2 months",
    points: [
      "Prepared and served protein shakes and nutrition-focused products in a gym environment.",
      "Assisted customers with orders, product questions, and point-of-sale transactions.",
      "Maintained cleanliness, organization, and product readiness during shifts.",
      "Developed customer service, communication, and time-management skills.",
    ],
  },
]

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about my experience, skills, and certifications.",
}

export const revalidate = 3600

export default async function AboutPage() {
  const [skillsData, certifications] = await Promise.all([
    getPublicSkills(),
    getPublicCertifications(),
  ])

  const skills = skillsData.map((skill) => ({
    id: skill.id ?? skill.name,
    name: skill.name,
    status: skill.status,
  }))

  const completedCertifications = certifications.filter((cert) => cert.completed !== false)
  const inProgressCertifications = certifications.filter((cert) => cert.completed === false)

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-12" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            <Card className="bg-muted/40 border-border p-6">
              <ul className="space-y-3">
                {aboutParagraphs.map((paragraph) => (
                  <li key={paragraph} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {experiences.map((item, index) => (
                <Card
                  key={`${item.company}-${item.role}`}
                  className={[
                    "p-5 border-l-4",
                    index === 0 && "border-l-blue-500 bg-blue-500/5",
                    index === 1 && "border-l-purple-500 bg-purple-500/5",
                    index === 2 && "border-l-emerald-500 bg-emerald-500/5",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="mb-3">
                    <span
                      className={[
                        "inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2",
                        index === 0 && "bg-blue-500/15 text-blue-600 dark:text-blue-400",
                        index === 1 && "bg-purple-500/15 text-purple-600 dark:text-purple-400",
                        index === 2 && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.period}
                    </span>
                    <h3 className="font-semibold text-foreground">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-12">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Certifications</h2>
                </div>

                <ul className="space-y-4 mb-6">
                  {completedCertifications.map((cert) => (
                    <li key={cert.title} className="text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{cert.title}</p>
                          <p className="text-xs">
                            {cert.issuer ?? "Unknown Issuer"} - Completed
                            {cert.grade ? ` - ${cert.grade}` : ""}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}

                  {inProgressCertifications.map((cert) => (
                    <li key={cert.title} className="text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{cert.title}</p>
                          <p className="text-xs">{cert.issuer ?? "Unknown Issuer"} - In Progress</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="/public/ashead-resume.pdf" download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>

              <SkillsSection skills={skills} />
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
