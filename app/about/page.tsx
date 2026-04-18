import type { Metadata } from "next"
import { Award, Download } from "lucide-react"

import SkillsSection from "@/components/sections/skillsection"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPublicCertifications, getPublicSkills } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

const aboutParagraphs = [
  "I'm Anthony Shead, a full-stack developer in California who likes building structured, scalable systems with modern web tools.",
  "I didn't take a traditional path into programming. I started by pulling things apart, modding games, tweaking configs, and seeing what broke. That curiosity turned into a pattern: deconstruct, understand, then rebuild with intention. That mindset still drives how I learn and how I build today.",
  "Programming really clicked for me when I started seeing it as architecture. It's not just writing code; it's designing how everything fits together, how components connect, how data moves, and how the system holds up as it grows. I try to build with structure from the start, favoring maintainability, clarity, and long-term scalability over quick hacks.",
  "Right now I'm working across a modern full-stack setup: Next.js, React, TypeScript, MongoDB, and Prisma. I'm also building real-world pieces like auth, payments, and email using tools such as Clerk, Stripe, and Resend. Most of what I work on revolves around connected systems, shared databases, multi-app setups, and APIs that can actually support real products.",
  "I'm building a small ecosystem of projects that all plug into each other, a portfolio with multiple apps like a blog, a creator store, and data tools, all under one structure. Alongside that, I'm working on Soren Tech, a development-focused brand aimed at helping people turn ideas into solid, working products. For me, it's not just about shipping features; it's about building systems that can grow, evolve, and stay reliable over time.",
  "Consistency is a big part of how I work. I've been swimming for over thirteen years and still train regularly, and that discipline carries over into development. I care about steady progress, strong fundamentals, and long-term effort. I try to write software the same way: structured, repeatable, and always improving.",
  "Long-term, I want to become a polyglot full-stack engineer, someone who knows multiple languages, paradigms, and architectures well enough to pick the right tool for the job. I care more about depth than shortcuts, and about building systems that are thoughtfully designed instead of rushed together.",
  "Outside of day-to-day development, I'm laying the groundwork for Earth Plus, a long-term project focused on aligning technology with sustainability and real-world impact. I believe that well-designed systems, technical or personal, can create meaningful, lasting change when they're built with intention.",
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
      "Built bespoke interfaces with React, Next.js, and Tailwind CSS to reflect each brand's voice and goals.",
      "Managed projects end-to-end - discovery, roadmaps, launch, and ongoing support - while keeping communication clear.",
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
                  <a href="/resume.pdf" download>
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
