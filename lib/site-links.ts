export const externalLinks = {
  socials: {
    github: "https://github.com/Drakeze",
    githubAlt: "https://github.com/DrakezeWind",
    linkedin: "https://www.linkedin.com/in/anthonyshead/",
    twitter: "https://x.com/SorenIdeas",
    discord: "https://discord.gg/ysJW2Jqcdj",
    patreon: "https://www.patreon.com/cw/Drakeze",
    dailydotdev: "https://daily.dev/drakeze",
    linktree: "https://linktr.ee/Drakeze",
  },
  ventures: {
    sorenTech: "https://SorenLab.com",
    earthPlus: "https://earthplus.org",
    creatorStore: process.env.NEXT_PUBLIC_CREATOR_STORE_URL ?? "https://store.drakeze.com/",
    anakonis: process.env.NEXT_PUBLIC_ANAKONIS_URL ?? "https://anakonis.drakeze.com",
    blog: process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog.drakeze.com",
    resources: process.env.NEXT_PUBLIC_CREATOR_RESOURCES_URL ?? "https://linktr.ee/Drakeze",
    patreon: "https://www.patreon.com/cw/Drakeze",
  },
} as const
