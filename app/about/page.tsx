import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about my experience, skills, and certifications.",
}

export default function AboutPage() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "REST APIs",
    "GraphQL",
  ]

  const certifications = ["IBM Full-Stack JavaScript Developer (in progress)"]

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I’m Anthony Shead, a full-stack developer focused on building clear, reliable, and intuitive web
              experiences. I specialize in turning ideas into well-structured products by combining thoughtful user
              experience with pragmatic engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My current stack centers on Next.js, TypeScript, Tailwind CSS, and MongoDB, with a strong emphasis on
              clean data flow, performance, and maintainability. I’m completing the IBM Full-Stack JavaScript Developer
              certification and actively deepening my backend and infrastructure skills through Python, Redis, Docker,
              and AWS as part of a broader push toward polyglot proficiency.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I also operate Soren Tech, a small development studio where I design and build custom solutions,
              prototypes, and internal tools. Each project is approached with a balance of user-centered design,
              scalable architecture, and long-term maintainability.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Outside of development, I spend time swimming, training at the gym, and exploring new games — habits that
              keep me disciplined, creative, and grounded. If you’re interested in collaborating, feel free to reach
              out. My work is available across two GitHub accounts (Drakeze and DrakezeWinds), organized by project
              focus and experimentation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Building software with a focus on people, systems, and long-term impact—across personal projects and
              emerging ventures.
            </p>

            <div className="flex gap-4">
              <a
                href={siteConfig.socials.githubAlt}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Founder & Full-Stack Developer</h3>
                    <p className="text-sm text-muted-foreground">Soren Tech</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2024 - Present</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Designing and delivering custom web solutions, prototypes, and internal tools with a focus on scalable
                  architecture, thoughtful UX, and maintainable code.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Freelance Full-Stack Developer</h3>
                    <p className="text-sm text-muted-foreground">Independent</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2020 - 2024</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built and maintained client-facing applications, modernizing stacks with Next.js, TypeScript, and
                  cloud-first workflows while keeping performance and accessibility at the center.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-3 mb-6">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  {cert}
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
