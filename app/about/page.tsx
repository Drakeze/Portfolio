import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Code,
  Zap,
  Users,
  Apple,
  Award,
  CheckCircle,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { absoluteUrl, siteConfig } from "@/lib/seo"
import { SkillsSection, type SkillCategory } from "@/components/sections/skills-section"

const aboutParagraphs = [
  "Hi, I’m Anthony Shead — a full-stack developer who loves turning ideas into intuitive products. I’m steadily working toward polyglot-level proficiency while completing the IBM Full-Stack JavaScript Developer certification and expanding the service catalog for my studio, Soren Tech.",
  "Right now my toolkit leans on Next.js, TypeScript, Tailwind CSS, and MongoDB, and I’m actively leveling up my backend automation and cloud workflows with Python, Redis, Docker, and AWS. Every engagement is an opportunity to blend user-centered thinking with reliable engineering.",
  "Outside of code you’ll find me in the pool, at the gym, or exploring new games — all outlets that keep me creative and balanced. If you’d like to collaborate, let’s connect! I run two GitHub accounts (Drakeze and DrakezeWinds) so feel free to explore both.",
]

const skills: SkillCategory[] = [
  {
    category: "Frontend",
    icon: <Code className="h-5 w-5" />,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    icon: <Zap className="h-5 w-5" />,
    technologies: ["Node.js", "MongoDB", "Prisma", "Rest APIs", "Server Actions"],
  },
  {
    category: "Tools",
    icon: <Users className="h-5 w-5" />,
    technologies: ["Git & GitHub", "Vercel", "Familiar"],
  },
  {
    category: "Exploring Next (Backend)",
    icon: <Apple className="h-5 w-5" />,
    technologies: ["Python", "Redis", "Docker"],
  },
  {
    category: "Currently Learning (Cloud)",
    icon: <Apple className="h-5 w-5" />,
    technologies: ["AWS", "Analytics", "Testing Libraries"],
  },
]

const certifications = [
  {
    name: "API Integration – End to End Web Development",
    provider: "Board Infinity",
    status: "Completed",
    completion: "86%",
  },
  {
    name: "Getting Started with Git and GitHub",
    provider: "IBM",
    status: "Completed",
    completion: "84.28%",
  },
  {
    name: "Introduction to HTML, CSS, & JavaScript",
    provider: "IBM",
    status: "Completed",
    completion: "88.57%",
  },
  {
    name: "Introduction to Software Engineering",
    provider: "IBM",
    status: "Completed",
    completion: "85.90%",
  },
]

const experience = [
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

export default function AboutPage() {
  // ─────────────────────────────────────────────
  // Skills
  // ─────────────────────────────────────────────
  const coreSkills = [
    "React",
    "Next.js (App Router)",
    "TypeScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Node.js",
    "MongoDB",
    "Prisma",
    "REST APIs",
  ]

  const supportingSkills = [
    "Git & GitHub",
    "Vercel",
    "Server Actions",
    "API Design Patterns",
    "Supabase",
  ]

  const learningSkills = [
    "Python",
    "Redis",
    "Docker",
    "AWS (Fundamentals)",
    "Testing Libraries",
  ]

  // ─────────────────────────────────────────────
  // Certifications
  // ─────────────────────────────────────────────
  const certifications = [
    {
      title: "API Integration – End to End Web Development",
      provider: "Board Infinity",
      status: "Completed",
      grade: "86%",
    },
    {
      title: "Getting Started with Git and GitHub",
      provider: "IBM",
      status: "Completed",
      grade: "84.28%",
    },
    {
      title: "Introduction to HTML, CSS, & JavaScript",
      provider: "IBM",
      status: "Completed",
      grade: "88.57%",
    },
    {
      title: "Introduction to Software Engineering",
      provider: "IBM",
      status: "Completed",
      grade: "85.90%",
    },
  ]

  const certificationsInProgress = [
    {
      title: "IBM Full-Stack JavaScript Developer",
      provider: "IBM / Coursera",
      status: "In Progress",
    },
  ]

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-12" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* ───────────── Left Column ───────────── */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I’m Anthony Shead, a full-stack developer focused on building clear,
              reliable, and intuitive web experiences. I specialize in turning ideas
              into well-structured products by combining thoughtful user experience
              with pragmatic engineering.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              My current stack centers on Next.js, TypeScript, Tailwind CSS, and MongoDB,
              with a strong emphasis on clean data flow, performance, and maintainability.
              I’m completing the IBM Full-Stack JavaScript Developer certification and
              actively deepening my backend and infrastructure skills through Python,
              Redis, Docker, and AWS as part of a broader push toward polyglot proficiency.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              I also operate Soren Tech, a small development studio where I design and
              build custom solutions, prototypes, and internal tools. Each project is
              approached with a balance of user-centered design, scalable architecture,
              and long-term maintainability.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Outside of development, I spend time swimming, training at the gym, and
              exploring new games — habits that keep me disciplined, creative, and
              grounded. My work is available across two GitHub accounts (Drakeze and
              DrakezeWinds), organized by project focus and experimentation.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Building software with a focus on people, systems, and long-term
              impact—across personal projects and emerging ventures.
            </p>

            <div className="flex gap-4">
              <a
                href={siteConfig.socials.githubAlt}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (Alternate)"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* ───────────── Right Column ───────────── */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Founder & Full-Stack Developer</h3>
                    <p className="text-sm text-muted-foreground">Soren Tech</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    2025 – Present
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Designing and delivering custom web solutions, prototypes, and internal
                  tools with a focus on scalable architecture, thoughtful UX, and
                  maintainable code.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Freelance Full-Stack Developer</h3>
                    <p className="text-sm text-muted-foreground">Independent</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2024</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built and maintained client-facing applications, modernizing stacks
                  with Next.js, TypeScript, and cloud-first workflows while keeping
                  performance and accessibility at the center.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── Skills & Certs ───────────── */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Skills & Technologies
            </h2>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Core</h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Supporting</h3>
              <div className="flex flex-wrap gap-2">
                {supportingSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Currently Learning</h3>
              <div className="flex flex-wrap gap-2">
                {learningSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-4 mb-6">
              {certifications.map((cert) => (
                <li key={cert.title} className="text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {cert.title}
                      </p>
                      <p className="text-xs">
                        {cert.provider} · {cert.status} · {cert.grade}
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
                      <p className="font-medium text-foreground">
                        {cert.title}
                      </p>
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
