import type { FieldConfig } from "@/lib/admin/fields"

export const skillFields = [
  { kind: "text", name: "name", label: "Skill", required: true, placeholder: "TypeScript" },
  { kind: "select", name: "status", label: "Status", required: true, options: [
    { value: "active", label: "Active" },
    { value: "learning", label: "Learning" },
    { value: "archived", label: "Archived" },
  ] },
  { kind: "text", name: "category", label: "Category", placeholder: "Frontend" },
  { kind: "text", name: "icon", label: "Icon key", placeholder: "typescript", help: "Matches a key in lib/icons/tech-icons." },
  { kind: "number", name: "level", label: "Level", min: 0, max: 100, help: "0 to 100." },
  { kind: "number", name: "order", label: "Order", min: 0, help: "Lower sorts first." },
  { kind: "text", name: "experienceDuration", label: "Experience", placeholder: "2 years" },
  { kind: "textarea", name: "blurb", label: "Blurb", rows: 3, span: 2, placeholder: "One line on how you use it." },
] as const satisfies readonly FieldConfig[]
