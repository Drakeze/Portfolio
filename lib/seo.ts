import { URL } from "url";

export const siteConfig = {
  name: "Anthony Shead",
  title: "Anthony Shead | Full-Stack Developer",
  description:
    "Full-stack developer portfolio featuring Anthony Shead's projects, experience, and services across the modern web stack.",
  url: "https://www.anthonyshead.com",
  email: "asheadworking@gmail.com",
  socials: {
    github: "https://github.com/Drakeze",
    githubAlt: "https://github.com/DrakezeWind",
    linkedin: "https://www.linkedin.com/in/anthonyshead/",
  },
}

export function absoluteUrl(path: string) {
  if (!path) {
    return siteConfig.url
  }

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalisedPath = path.startsWith("/public/") ? path.replace("/public", "") : path

  return new URL(normalisedPath, siteConfig.url).toString()
}
