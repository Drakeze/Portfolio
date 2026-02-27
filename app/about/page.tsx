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
import { listCertifications } from "@/lib/domains/certifications/service"
import { listSkills } from "@/lib/domains/skills/service"
import { siteConfig } from "@/lib/seo"
import SkillsSection from "@/components/sections/skillsection"

const aboutParagraphs = [
  "I’m Anthony Shed, a self-taught full-stack developer based in California. I’ve always been drawn to understanding how things work, not just using them, but breaking them apart, studying the structure behind them, and rebuilding them in better ways. That curiosity is what originally pulled me into programming, long before I thought of it as a career path.",
 "My introduction to technical problem-solving came through games. What started as simple performance tweaks and customization in older titles, such as Team Fortress 2, gradually evolved into exploring configuration files, modifying behavior, and realizing that software itself is just a system waiting to be understood. That moment realizing I could change how things behaved became the foundation for how I approach learning today.",
 "What really made programming click for me was recognizing it as a form of architecture. Tools like VS Code, file trees, and project structure felt similar to how buildings or engineered systems are designed, with layers, dependencies, and intentional organization. Since then, I’ve focused less on memorizing tools and more on understanding how systems fit together, how decisions compound over time, and how to build things that remain maintainable as they grow.",
 "Consistency plays a major role in my life and my work. I’ve been swimming for over thirteen years, train regularly at the gym, and enjoy hobbies that reward patience and systems thinking, like Minecraft and automation-heavy gameplay. Those habits translate directly into how I learn and build software: steady progress, strong fundamentals, and long-term commitment matter more than short bursts of motivation.",
 "Long-term, my goal is to grow into a polyglot software engineer, someone who understands multiple languages, paradigms, and architectures well enough to choose the right tool for the problem rather than forcing a familiar one. I’m motivated by depth, not shortcuts, and by building systems that are thoughtfully designed instead of rushed.",
 "Alongside professional roles, I’m building Soren Tech as a way to help people turn ideas into real, well-structured products, and laying the groundwork for Earth Plus, a longer-term initiative focused on aligning technology with sustainability and environmental responsibility. I believe well-designed systems, whether technical or personal, have the power to create meaningful, lasting impact when they’re built with intention."
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

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about my experience, skills, and certifications.",
}

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const [skillsDocs, certificationsDocs] = await Promise.all([listSkills(), listCertifications()])

  const skills = skillsDocs.map((skill) => ({
    id: skill._id.toString(),
    name: skill.name,
    status: skill.status ?? "active",
  }))

  const completedCertifications = certificationsDocs.filter((cert) => cert.completed !== false)
  const inProgressCertifications = certificationsDocs.filter((cert) => cert.completed === false)

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

        <div className="border-t pt-12">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT: Certifications (unchanged content) */}
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
                            {cert.issuer ?? "Unknown Issuer"} · Completed
                            {cert.grade ? ` · ${cert.grade}` : ""}
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
                          <p className="text-xs">
                            {cert.issuer ?? "Unknown Issuer"} · In Progress
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
              </div>

              {/* RIGHT: Skills */}
              <SkillsSection skills={skills} />

            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
