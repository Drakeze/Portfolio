import type { FieldConfig } from "@/lib/admin/fields"

export const certificationFields = [
  { kind: "text", name: "title", label: "Certification", required: true, placeholder: "AWS Solutions Architect" },
  { kind: "text", name: "issuer", label: "Issuer", placeholder: "Amazon Web Services" },
  { kind: "date", name: "dateIssued", label: "Date issued" },
  { kind: "text", name: "grade", label: "Grade", placeholder: "Pass / 92%" },
  { kind: "url", name: "credentialUrl", label: "Credential URL", placeholder: "https://..." },
  { kind: "number", name: "order", label: "Order", min: 0, help: "Lower sorts first." },
  { kind: "image", name: "image", label: "Badge", folder: "certifications", span: 2 },
  { kind: "checkbox", name: "completed", label: "Completed", span: 2 },
] as const satisfies readonly FieldConfig[]
