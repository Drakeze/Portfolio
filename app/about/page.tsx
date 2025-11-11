import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Download, Mail, Github, Linkedin, Code, Zap, Users, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { absoluteUrl } from "@/lib/seo"
import { SkillsSection, type SkillCategory } from "@/components/skills-section"

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
    technologies: ["Node.js", "MongoDB"],
  },
  {
    category: "Tools",
    icon: <Users className="h-5 w-5" />,
    technologies: ["Git & GitHub", "Vercel", "Supabase", "Stripe"],
  },
  {
    category: "Learning (Backend)",
    icon: <Apple className="h-5 w-5" />,
    technologies: ["Python", "Redis", "Docker"],
  },
  {
    category: "Learning (Cloud)",
    icon: <Apple className="h-5 w-5" />,
    technologies: ["AWS", "Analytics", "Testing Libraries"],
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
  title: "About",
  description:
    "Learn about Anthony Shead's background as a full-stack developer, the skills powering Soren Tech, and how to connect.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Anthony Shead",
    description:
      "Discover the story, skills, and experience Anthony Shead brings to building thoughtful full-stack solutions.",
    url: absoluteUrl("/about"),
    images: [
      {
        url: absoluteUrl("/profile/anthony-shead-portrait.svg"),
        width: 800,
        height: 800,
        alt: "Portrait of Anthony Shead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Anthony Shead",
    description:
      "Discover the story, skills, and experience Anthony Shead brings to building thoughtful full-stack solutions.",
    images: [absoluteUrl("/profile/anthony-shead-portrait.svg")],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">About Me</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild>
                  <Link href="mailto:asheadworking@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/Drakeze" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub (Drakeze)</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/DrakezeWinds" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub (DrakezeWinds)</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://www.linkedin.com/in/anthonyshead/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/profile/anthony-shead-portrait.svg"
                    alt="Portrait of Anthony Shead"
                    width={440}
                    height={560}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                  <Code className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <SkillsSection skills={skills} />

          {/* Experience Section */}
          <section>
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <Card key={exp.role} className="border-border">
                  <CardContent className="p-6">
                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                        <p className="font-medium text-primary">{exp.company}</p>
                      </div>
                      <span className="self-start rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground md:self-center">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {exp.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
