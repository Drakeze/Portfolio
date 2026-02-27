import { Code, Zap } from "lucide-react"

import { Card } from "@/components/ui/card"

type SkillItem = {
  id: string
  name: string
  status: "active" | "learning" | "archived"
}

type SkillsSectionProps = {
  skills: SkillItem[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const completedSkills = skills.filter((skill) => skill.status === "active")
  const learningSkills = skills.filter((skill) => skill.status === "learning")

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-2xl font-semibold mb-6 gap-2">
        <Code className="h-5 w-5" />
        Skills & Learning
      </h2>

      <section>
        <h3 className="text-lg font-medium mb-4">Proficient & Completed</h3>
        <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {completedSkills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </section>

      <div className="border-t border-muted my-6" />

      <section>
        <h3 className="flex items-center text-lg font-medium mb-4 gap-2">
          <Zap className="h-5 w-5" />
          Currently Learning
        </h3>
        <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {learningSkills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </section>
    </Card>
  )
}
