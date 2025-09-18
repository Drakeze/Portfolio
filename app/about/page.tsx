import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, Code, Palette, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const skills = [
    {
      category: "Frontend",
      icon: <Code className="h-5 w-5" />,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Svelte"],
    },
    {
      category: "Backend",
      icon: <Zap className="h-5 w-5" />,
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker"],
    },
    {
      category: "Design",
      icon: <Palette className="h-5 w-5" />,
      technologies: ["Figma", "Adobe XD", "Photoshop", "UI/UX Design", "Prototyping"],
    },
    {
      category: "Tools",
      icon: <Users className="h-5 w-5" />,
      technologies: ["Git", "AWS", "Vercel", "Supabase", "Stripe", "Analytics"],
    },
  ]

  const experience = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern web technologies.",
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Developed and maintained web applications using React, Node.js, and cloud technologies. Collaborated with design teams to create user-friendly interfaces.",
    },
    {
      role: "Frontend Developer",
      company: "Creative Agency",
      period: "2018 - 2020",
      description:
        "Built responsive websites and web applications for various clients, focusing on performance optimization and user experience.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience creating digital experiences
                  that combine beautiful design with robust functionality. My journey in web development started with a
                  curiosity about how things work on the internet, and it has evolved into a career dedicated to
                  crafting solutions that make a real impact.
                </p>
                <p>
                  I specialize in modern web technologies like React, Next.js, and TypeScript, with a strong focus on
                  user experience and performance optimization. When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
                <p>
                  I believe in the power of collaboration and continuous learning. Every project is an opportunity to
                  push boundaries and create something meaningful that serves both users and business objectives.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <Button asChild>
                  <Link href="mailto:hello@example.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resume.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative">
                <img
                  src="/professional-developer-portrait.png"
                  alt="Profile"
                  className="rounded-2xl shadow-2xl w-full max-w-md"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="border-border hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{skill.icon}</div>
                      <h3 className="font-semibold text-foreground">{skill.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2 md:mt-0 self-start">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
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
