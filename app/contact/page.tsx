import { AccentHeading } from "@/components/accent-heading"
import { Dot } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"
import { SignGlobeBanner } from "@/components/sign-globe-banner"
import { siteConfig } from "@/lib/seo"
import { externalLinks } from "@/lib/site-links"
import type { Metadata } from "next"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: `Contact - ${siteConfig.name}`,
  description: "Get in touch with Anthony Shead for collaborations, consulting, or just to say hello.",
}

const SOCIAL_ROWS = [
  { label: "Email", handle: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "LinkedIn", handle: "anthonyshead", href: externalLinks.socials.linkedin },
  { label: "GitHub", handle: "Drakeze", href: externalLinks.socials.github },
  ...(externalLinks.socials.twitch
    ? [{ label: "Twitch", handle: "anakonis", href: externalLinks.socials.twitch }]
    : []),
]

export default function ContactPage() {
  return (
    <>
      <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <Eyebrow number="04" label="CONTACT" />
          <AccentHeading plain="Let&apos;s " accent="talk." as="h1" size="xl" />
        </div>

        <p className="text-[19px] text-muted-foreground max-w-[660px] leading-relaxed mb-12">
          Reach out for collaborations, consulting, or product opportunities. I usually reply within two business days.
        </p>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Left: form */}
          <ContactForm />

          {/* Right: availability + social rows */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 w-fit">
              <Dot variant="status" />
              <span className="font-mono text-[12px] text-muted-foreground">Available · Los Angeles</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {SOCIAL_ROWS.map(({ label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-between rounded-xl border border-border px-5 py-4 hover:border-border-strong transition-colors group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    <span className="font-mono text-[12px] text-muted-foreground">{handle}</span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SignGlobeBanner />
    </>
  )
}
