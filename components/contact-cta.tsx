import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ContactCTAProps = {
  className?: string
}

export function ContactCTA({ className }: ContactCTAProps) {
  return (
    <section className={cn("py-20 px-6", className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Let's Work Together</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities and collaborations. Let's discuss how we can bring your ideas to life.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="mailto:asheadworking@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Drakeze" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/DrakezeWind" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/anthonyshead/" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
