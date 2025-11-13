import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { absoluteUrl, siteConfig } from "@/lib/seo"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
//import { Footer } from "@/components/footer"
//import { ProjectCard } from "@/components/project-card"
//import { projects } from "@/lib/projects"


export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Anthony Shead's portfolio of web applications, dashboards, and platforms built with Next.js, TypeScript, and more.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Anthony Shead's Projects",
    description:
      "See detailed case studies and links for Anthony Shead's cryptocurrency tracker, dashboards, and other full-stack builds.",
    url: absoluteUrl("/projects"),
    images: [
      {
        url: absoluteUrl("/projects/productivity-dashboard.svg"),
        width: 1200,
        height: 630,
        alt: "Preview of Anthony Shead's productivity dashboard project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Shead's Projects",
    description:
      "See detailed case studies and links for Anthony Shead's cryptocurrency tracker, dashboards, and other full-stack builds.",
    images: [absoluteUrl("/projects/productivity-dashboard.svg")],
  },
}

export default function ProjectsPage() {
  const projects = [
    {
      title: "Cryptocurrency Tracker",
      description:
        "A comprehensive cryptocurrency dashboard with real-time market data, curated watchlists, and conversion tools for fast portfolio insights.",
      image: "/projects/crypto-tracker.svg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "CoinGecko API", "Vercel"],
      liveUrl: "https://cryptoapp-weld.vercel.app/",
      githubUrl: "https://github.com/Drakeze/CT-app",
    },
    {
      title: "Dashboard App",
      description:
        "A clean and intuitive task management dashboard with real-time collaboration, drag-and-drop functionality, and customizable workflows for enhanced productivity.",
      image: "/projects/productivity-dashboard.svg",
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      liveUrl: "https://dashboard-drakeze.vercel.app",
      githubUrl: "https://github.com/Drakeze/Dashboard",
    },
    {
      title: "Blogging Platform",
      description:
        "Responsive portfolio website showcasing creative work and projects with smooth animations, optimized performance, and modern design principles.",
      image: "/projects/blogging-platform.svg",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Vercel"],
      liveUrl: "https://blog-nine-eta-94.vercel.app/",
      githubUrl: "https://github.com/Drakeze/Blog",
    },
    {
      title: "Church Website",
      description:
        "A modern church website with event management, sermon archives, and community engagement features to connect members and visitors.",
      image: "/projects/community-site.svg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://church-web-xi.vercel.app/",
      githubUrl: "https://github.com/DrakezeWind/Church-Web",
    },
    {
      title: "GrowthVault",
      description:
        "A collaborative study repository with bite-sized projects and code snippets that document my learning journey.",
      image: "/projects/study-repository.svg",
      tags: ["React", "JavaScript", "Python", "C++", "Ruby", "C#", "Java", "PHP", "Go", "Docker"],
      githubUrl: "https://github.com/DrakezeWind/NotesStudy",
    },
  ]

  const projectsBaseUrl = absoluteUrl("/projects")

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": projects.map((project) => {
      const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      const imagePath = project.image.startsWith("/public/")
        ? project.image.replace("/public", "")
        : project.image
      return {
        "@type": "Project",
        name: project.title,
        description: project.description,
        url: project.liveUrl ?? `${projectsBaseUrl}#${slug}`,
        image: absoluteUrl(imagePath),
        sameAs: project.githubUrl ? [project.githubUrl] : undefined,
        creator: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }
    }),
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group border-border transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[5/3] overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 380px, (min-width: 1024px) 480px, 90vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent/10 text-accent-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {project.liveUrl ? (
                        <Button size="sm" asChild>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="cursor-not-allowed opacity-70">
                          Coming Soon
                        </Button>
                      )}
                      {project.githubUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                      ) : null}
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
