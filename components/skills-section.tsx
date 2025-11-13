import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

type SkillCategory = {
  category: string
  icon: ReactNode
  technologies: string[]
}

type SkillsSectionProps = {
  skills: SkillCategory[]
  title?: string
  className?: string
}

export function SkillsSection({
  skills,
  title = "Skills & Technologies",
  className,
}: SkillsSectionProps) {
  return (
    <section className={cn("mb-20", className)}>
      <h2 className="mb-8 text-center text-3xl font-bold text-foreground">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => (
          <Card
            key={skill.category}
            className="border-border transition-colors hover:border-primary/20"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">{skill.icon}</div>
                <h3 className="font-semibold text-foreground">{skill.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export type { SkillCategory }
