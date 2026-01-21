"use client";

import { Code, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

type SkillCategory = {
  category: string;
  icon: React.ReactNode;
  technologies: string[];
};

export default function SkillsSection() {
  const skills: SkillCategory[] = [
    {
      category: "Frontend",
      icon: <Code className="h-5 w-5" />,
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
      ],
    },
    {
      category: "Backend",
      icon: <Zap className="h-5 w-5" />,
      technologies: [
        "Node.js",
        "MongoDB",
        "Prisma",
        "REST APIs",
        "Server Actions",
      ],
    },
    {
      category: "Tools",
      icon: <Users className="h-5 w-5" />,
      technologies: ["Git & GitHub", "Vercel", "Bun"],
    },
    {
      category: "Exploring Next (Backend)",
      icon: <Zap className="h-5 w-5" />,
      technologies: ["Python", "Redis", "Docker"],
    },
    {
      category: "Currently Learning (Cloud)",
      icon: <Users className="h-5 w-5" />,
      technologies: ["AWS", "Analytics", "Testing Libraries"],
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        Skills & Focus Areas
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Card
            key={skill.category}
            className="p-5 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-3">
              {skill.icon}
              <h3 className="font-medium">{skill.category}</h3>
            </div>

            <ul className="space-y-1 text-sm text-muted-foreground">
              {skill.technologies.map((tech) => (
                <li key={tech}>• {tech}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
