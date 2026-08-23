"use client"

import { Linkedin } from "lucide-react"
import posthog from "posthog-js"
import type { IconType } from "react-icons"
import { SiDailydotdev, SiDiscord, SiGithub, SiLinktree, SiX } from "react-icons/si"

import type { SocialLinks } from "@/lib/domains/links/types"

type SocialTile = {
  key: keyof SocialLinks
  label: string
  Icon: IconType
}

const SOCIAL_TILES: SocialTile[] = [
  { key: "github", label: "GitHub", Icon: SiGithub },
  { key: "githubAlt", label: "GitHub (Alt)", Icon: SiGithub },
  { key: "discord", label: "Discord", Icon: SiDiscord },
  { key: "dailydotdev", label: "daily.dev", Icon: SiDailydotdev },
  { key: "twitter", label: "X", Icon: SiX },
  { key: "linktree", label: "Linktree", Icon: SiLinktree },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
]

export function SocialsGrid({ socials }: { socials: SocialLinks }) {
  const tiles = SOCIAL_TILES.filter((tile) => socials[tile.key])

  return (
    <div className="flex flex-wrap gap-4">
      {tiles.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-xl border border-transparent p-4 transition-all hover:border-foreground/30 hover:bg-muted/60"
          onClick={() => posthog.capture("social_link_clicked", { platform: label, href: socials[key] })}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted/40">
            <Icon className="h-7 w-7 text-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </a>
      ))}
    </div>
  )
}
