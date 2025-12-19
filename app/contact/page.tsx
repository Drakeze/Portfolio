import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Your Name",
  description: "Get in touch with me for projects and opportunities",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <div className="w-16 h-1 bg-foreground mb-12"></div>

        <Card className="p-8">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just
              want to say hi, feel free to reach out.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <a href="mailto:asheadworking@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.linkedin.com/in/anthonyshead/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Connect</h2>
              <div className="flex gap-6">
                <a
                  href="https://github.com/Drakeze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://github.com/DrakezeWind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anthonyshead/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://x.com/SorenIdeas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="mailto:asheadworking@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
