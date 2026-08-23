import type { ComponentType } from "react"

import EarthPlusBanner from "@/components/banners/EarthPlusBanner"
import SorenLabBanner from "@/components/banners/SorenLabBanner"

export type Company = {
  slug: string
  title: string
  tagline: string
  shortDescription: string
  longDescription: string
  heroImage?: string
  gallery: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Banner?: ComponentType<any>
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  accentColor?: string
}
export const companies: Company[] = [
  {
    slug: "soren-tech",
    title: "Soren Lab",
    tagline: "Turning ideas into working prototypes before a line of code is written.",
    shortDescription:
      "A one-person web studio that builds a live, clickable mockup before the second meeting, then ships company-level, fully-owned code for local businesses and founders.",
    longDescription: `SorenLab is a web studio built on a simple observation: most good ideas do not fail for lack of potential. They fail in translation, in the gap between what someone pictured and what actually got built.

The studio closes that gap early. After a first conversation, SorenLab builds a live, clickable mockup of the proposed site before the second meeting. Not a wireframe, not a Figma file only a designer can read. A real prototype you can navigate. You walk through it, react to it in real time, and what you approve becomes the scope. Nobody leaves that meeting wondering what they are getting.

There are two ways to work: fully custom builds for businesses with specific workflows, branding, or functionality a template cannot carry, and standardized site packages for businesses that need to be live quickly at the same quality bar. Either way, the output is company-level code, maintainable and documented, and the client owns all of it outright on final payment.

SorenLab is run by one person, operating as EarthPlus LLC. AI is part of how the work moves this fast; the architecture, the judgment, and the craft are not handed off. The focus right now is deliberately narrow: build genuinely excellent websites for local businesses, entrepreneurs, and early-stage founders. Reusable tooling and broader ambitions come after that core is real and proven, not before.`,
    Banner: SorenLabBanner,
    accentColor: '#185FA5',
    gallery: [],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "pnpm",
      "Prisma",
      "GraphQL",
      "React",
      "MongoDB",
      "Stripe API",
    ],
    githubUrl: "https://github.com/SorenLab",
  },
  {
    slug: "earth-plus",
    title: "Earth Plus",
    tagline: "For-profit by design, so it can fund environmental work on its own terms.",
    shortDescription:
      "A for-profit venture that reinvests its own revenue into sustainability — recycled goods, environmental tooling, and on-the-ground foundations — instead of relying on donation cycles.",
    longDescription: `EarthPlus is a long-term venture centered on the belief that technological progress shouldn't come at the cost of the planet it depends on. The goal isn't to reject technology; it's to build with it deliberately, and to route what it earns back toward sustainability and environmental preservation.

The model is for-profit by design. Nonprofits depend on donation cycles; a business that sells something people want can fund environmental work from its own operations and scale that funding as it grows. EarthPlus is structured so that reinvestment is part of the operating model rather than a line item that gets cut in a bad quarter.

It's built as an ecosystem rather than a single product: sustainable and reusable goods, environmental tooling, and reinvestment into foundations doing work on the ground. The emphasis is on systems that adapt and compound over time rather than one-off gestures.

EarthPlus is in early planning. The technical work funding it comes first, and this page will get more specific as the initiative does.`,
    Banner: EarthPlusBanner,
    accentColor: '#1D9E75',
    gallery: [],
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "pnpm",
      "MongoDB",
      "GraphQL",
      "Prisma",
      "Stripe API",
    ],
    githubUrl: "https://github.com/EarthPlus-Organization/EP-Mono",
  },
]
