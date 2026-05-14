import { Code, Zap } from "lucide-react"

type SkillItem = {
  id: string
  name: string
  status: "active" | "learning" | "archived"
}

type SkillsSectionProps = {
  skills: SkillItem[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const activeSkills = skills.filter((skill) => skill.status === "active")
  const learningSkills = skills.filter((skill) => skill.status === "learning")

  return (
    <div className="space-y-6">
      <h2 className="flex items-center text-2xl font-semibold gap-2">
        <Code className="h-5 w-5" />
        Skills & Learning
      </h2>

      <section>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Proficient</h3>
        <div className="flex flex-wrap gap-2">
          {activeSkills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full border bg-accent/10 px-3 py-1 text-sm font-medium text-foreground"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <div className="border-t border-muted" />

      <section>
        <h3 className="flex items-center text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          Currently Learning
        </h3>
        <div className="flex flex-wrap gap-2">
          {learningSkills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full border border-dashed bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
