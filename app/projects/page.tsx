import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A comprehensive e-commerce solution featuring user authentication, payment processing, inventory management, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
      image: "/modern-ecommerce-interface.png",
      tags: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/ecommerce",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team collaboration features, project tracking, and intuitive drag-and-drop interface for enhanced productivity.",
      image: "/clean-task-management-dashboard.jpg",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/taskmanager",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio website showcasing creative work and projects with smooth animations, optimized performance, and modern design principles.",
      image: "/minimal-portfolio-website.png",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "MDX"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/portfolio",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with location-based forecasts, historical data visualization, and customizable widgets for weather enthusiasts.",
      image: "/weather-dashboard-interface.png",
      tags: ["Vue.js", "Chart.js", "OpenWeather API", "Vuex"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/weather",
    },
    {
      title: "Social Media Analytics",
      description:
        "Comprehensive analytics platform for social media management with engagement tracking, content scheduling, and performance insights.",
      image: "/social-media-analytics-dashboard.png",
      tags: ["React", "D3.js", "Node.js", "Redis", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/analytics",
    },
    {
      title: "Learning Management System",
      description:
        "Educational platform with course management, progress tracking, interactive quizzes, and video streaming capabilities for online learning.",
      image: "/lms-interface.png",
      tags: ["Next.js", "Supabase", "Stripe", "Video.js", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/lms",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">My Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A collection of projects that demonstrate my skills in web development, user experience design, and
              problem-solving across various technologies and domains.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/20"
              >
                <CardContent className="p-0">
                  <div className="aspect-[5/3] overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-accent/10 text-accent-foreground text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Button size="sm" asChild>
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.githubUrl} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
