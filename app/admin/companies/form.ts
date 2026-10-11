import type { FieldConfig } from "@/lib/admin/fields"

export const companyFields = [
  { kind: "text", name: "title", label: "Company", required: true, placeholder: "Company name" },
  { kind: "text", name: "slug", label: "Slug", placeholder: "auto from company", help: "Leave blank to generate." },
  { kind: "text", name: "tagline", label: "Tagline", required: true, span: 2, placeholder: "One line on what they do" },
  { kind: "gallery", name: "gallery", label: "Gallery", folder: "companies", span: 2 },
  { kind: "tags", name: "techStack", label: "Tech stack", placeholder: "Next.js, Stripe, Postgres", help: "Comma separated." },
  { kind: "number", name: "order", label: "Order", min: 0, help: "Lower sorts first." },
  { kind: "url", name: "liveUrl", label: "Live URL", placeholder: "https://example.com" },
  { kind: "url", name: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/org/repo" },
  { kind: "textarea", name: "longDescription", label: "Long description", rows: 7, required: true, span: 2 },
] as const satisfies readonly FieldConfig[]
