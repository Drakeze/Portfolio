import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Your Name",
  description: "View my portfolio of web development projects and applications",
}

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment processing, inventory management, and analytics dashboard.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    image: "/modern-ecommerce-dashboard.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Real-Time Chat Application",
    description: "WebSocket-based chat app with rooms, direct messaging, and file sharing capabilities.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/chat-application-interface.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management Tool",
    description: "Collaborative project management platform with kanban boards, team collaboration, and time tracking.",
    tags: ["TypeScript", "Next.js", "Prisma", "tRPC"],
    image: "/task-management-kanban.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Weather Forecast App",
    description: "Beautiful weather application with 7-day forecasts, location-based data, and interactive maps.",
    tags: ["React", "OpenWeather API", "Mapbox", "Chart.js"],
    image: "/weather-forecast-app.png",
    github: "https://github.com",
    live: "https://example.com",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <div className="w-16 h-1 bg-foreground mb-4"></div>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          A collection of projects showcasing my work in web development, from full-stack applications to interactive
          user interfaces.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
