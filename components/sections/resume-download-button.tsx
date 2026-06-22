"use client"

import { Download } from "lucide-react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"

interface ResumeDownloadButtonProps {
  url: string
  label: string
}

export function ResumeDownloadButton({ url, label }: ResumeDownloadButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full bg-transparent"
      asChild
      onClick={() => posthog.capture("resume_downloaded", { resume_label: label })}
    >
      <a href={url} download>
        <Download className="h-4 w-4 mr-2" />
        {label}
      </a>
    </Button>
  )
}
