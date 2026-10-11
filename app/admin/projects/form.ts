import type { FieldConfig } from "@/lib/admin/fields"

export const projectFields = [
  { kind: "text", name: "title", label: "Title", required: true, placeholder: "Project title" },
  { kind: "text", name: "slug", label: "Slug", placeholder: "auto from title", help: "Leave blank to generate from the title." },
  { kind: "image", name: "image", label: "Cover image", folder: "projects", span: 2 },
  { kind: "tags", name: "techStack", label: "Tech stack", placeholder: "Next.js, TypeScript, MongoDB", help: "Comma separated." },
  { kind: "number", name: "order", label: "Order", min: 0, help: "Lower sorts first." },
  { kind: "url", name: "liveUrl", label: "Live URL", placeholder: "https://example.com" },
  { kind: "url", name: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/user/repo" },
  { kind: "checkbox", name: "featured", label: "Featured project", span: 2 },
  { kind: "textarea", name: "description", label: "Description", rows: 5, required: true, span: 2 },
] as const satisfies readonly FieldConfig[]
