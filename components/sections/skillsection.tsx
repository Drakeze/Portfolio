"use client";

import { Code, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SkillsSection() {
  const completedSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Git & GitHub",
    "REST APIs",
    "MongoDB",
    "Node.js",
  ];

  const learningSkills = [
    "Python",
    "Redis",
    "Docker",
    "AWS",
    "Analytics",
    "Testing Libraries",
    "Prisma",
    "GraphQL",
  ];

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
            <li key={skill}>{skill}</li>
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
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
