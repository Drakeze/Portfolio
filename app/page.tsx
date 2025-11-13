//import {Footer} from "@/components/footer"
//import { Header } from "@/components/header"
//import Image from "next/image"
//import { Github, Linkedin, Mail } from "lucide-react"
//import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { absoluteUrl, siteConfig } from "@/lib/seo"
import { ProjectCard } from "@/components/project-card"
import { featuredProjects } from "@/lib/projects"
import { ArrowRight } from "lucide-react";

const heroOgImage = absoluteUrl("/projects/ecommerce-case-study.svg")

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover Anthony Shead's featured full-stack projects, services, and ways to collaborate on modern web experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anthony Shead | Full-Stack Portfolio",
    description:
      "Explore highlighted projects and capabilities from full-stack developer Anthony Shead, including e-commerce and productivity showcases.",
    url: siteConfig.url,
    images: [
      {
        url: heroOgImage,
        width: 1200,
        height: 630,
        alt: "Anthony Shead's featured e-commerce project thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Shead | Full-Stack Portfolio",
    description:
      "Explore highlighted projects and capabilities from full-stack developer Anthony Shead, including e-commerce and productivity showcases.",
    images: [heroOgImage],
  },
}

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Crafting Digital
            <span className="text-primary block">Experiences</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            I'm a passionate developer creating beautiful, functional, and user-centered digital experiences that make a
            difference.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of recent work that showcases my skills and passion for creating exceptional digital
              experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} variant="featured" />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <footer />
    </div>
  )
}
