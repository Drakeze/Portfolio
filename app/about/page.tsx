import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Your Name",
  description: "Learn more about my experience, skills, and certifications",
}

export default function AboutPage() {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "REST APIs", "GraphQL"]

  const certifications = ["AWS Certified Developer", "Google Cloud Professional", "Meta Frontend Developer"]

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I’m Anthony Shead, a full-stack developer focused on building clear, reliable, and intuitive web experiences. I specialize in turning ideas into well-structured products by combining thoughtful user experience with pragmatic engineering.

              My current stack centers on Next.js, TypeScript, Tailwind CSS, and MongoDB, with a strong emphasis on clean data flow, performance, and maintainability. I’m completing the IBM Full-Stack JavaScript Developer certification and actively deepening my backend and infrastructure skills through Python, Redis, Docker, and AWS as part of a broader push toward polyglot proficiency.

              I also operate Soren Tech, a small development studio where I design and build custom solutions, prototypes, and internal tools. Each project is approached with a balance of user-centered design, scalable architecture, and long-term maintainability.

              Outside of development, I spend time swimming, training at the gym, and exploring new games — habits that keep me disciplined, creative, and grounded.
              If you’re interested in collaborating, feel free to reach out. My work is available across two GitHub accounts (Drakeze and DrakezeWinds), organized by project focus and experimentation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Building software with a focus on people, systems, and long-term impact—across personal projects and emerging ventures.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/DrakezeWind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
               <a
                href="https://github.com/Drakeze"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/anthonyshead/"
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
                    <h3 className="font-semibold">Senior Developer</h3>
                    <p className="text-sm text-muted-foreground">Tech Company</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2022 - Present</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Leading frontend development and architecting scalable web applications.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Full-Stack Developer</h3>
                    <p className="text-sm text-muted-foreground">Startup Inc</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2020 - 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built and maintained multiple client-facing applications.
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
