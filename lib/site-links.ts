export const externalLinks = {
  socials: {
    github: "https://github.com/Drakeze",
    githubAlt: "https://github.com/DrakezeWind",
    linkedin: "https://www.linkedin.com/in/anthonyshead/",
    twitter: "https://x.com/SorenIdeas",
  },
  ventures: {
    sorenTech: "https://soren.tech",
    earthPlus: "https://earthplus.org",
    creatorStore: process.env.NEXT_PUBLIC_CREATOR_STORE_URL ?? "https://store.soren.tech",
    resources: process.env.NEXT_PUBLIC_CREATOR_RESOURCES_URL ?? "https://linktr.ee/sorenresources",
  },
} as const
