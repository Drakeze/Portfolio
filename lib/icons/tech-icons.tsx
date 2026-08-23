import { BarChart3, TestTube, Webhook, Wrench } from "lucide-react"
import type { IconType } from "react-icons"
import { FaAws, FaCss3 } from "react-icons/fa6"
import {
  SiClaude,
  SiCloudflare,
  SiDocker,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiLua,
  SiMongodb,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

const TECH_ICONS: Record<string, IconType> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  html5: SiHtml5,
  html: SiHtml5,
  css3: FaCss3,
  css: FaCss3,
  git: SiGit,
  "git & github": SiGit,
  mongodb: SiMongodb,
  nodedotjs: SiNodedotjs,
  "node.js": SiNodedotjs,
  python: SiPython,
  redis: SiRedis,
  docker: SiDocker,
  amazonaws: FaAws,
  aws: FaAws,
  graphql: SiGraphql,
  prisma: SiPrisma,
  claude: SiClaude,
  cloudflare: SiCloudflare,
  lua: SiLua,
  neovim: SiNeovim,
  "rest-apis": Webhook,
  "rest apis": Webhook,
  analytics: BarChart3,
  testing: TestTube,
  "testing libraries": TestTube,
}

/** ponytail: covers common tech names; unmapped skills fall back to a generic icon. */
export function getTechIcon(iconKeyOrName: string): IconType {
  const key = iconKeyOrName.trim().toLowerCase()
  return TECH_ICONS[key] ?? Wrench
}
