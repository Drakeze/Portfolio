import { ZodError, z } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage } from "@/lib/domains/messages/service"
import { getPostHogClient } from "@/lib/posthog-server"
import { createRateLimiter } from "@/lib/rate-limit"
import { getContactRecipientEmail, getMailFrom, resend } from "@/src/lib/resend"

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

const isRateLimited = createRateLimiter(5, 10 * 60 * 1000)

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
      return errorResponse("Too many messages sent. Please try again later.", 429)
    }

    const { name, email, message } = contactSchema.parse(await req.json())
    const to = getContactRecipientEmail()
    if (!resend || !to) {
      return errorResponse("Contact email is not configured right now. Please try again later.", 503)
    }

    const savedMessage = await createMessage({
      name,
      email,
      message,
      source: "contact",
      read: false,
    })

    const [notificationResult, autoReplyResult] = await Promise.all([
      resend.emails.send({
        from: getMailFrom(),
        to,
        subject: `New Portfolio Contact from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
      resend.emails.send({
        from: getMailFrom(),
        to: email,
        subject: "Thanks for reaching out",
        text: `Hi ${name},\n\nThanks for your message. I have received it and will get back to you soon.\n\nYour message:\n${message}\n`,
      }),
    ])

    if (notificationResult.error) {
      console.error("Resend contact notification failed:", notificationResult.error)
      return errorResponse(
        "Your message was saved, but notification delivery failed. Please email me directly if this is urgent.",
        503
      )
    }

    const posthog = getPostHogClient()
    posthog.capture({
      distinctId: email,
      event: "contact_message_received",
      properties: {
        sender_name: name,
        auto_reply_sent: !autoReplyResult.error,
      },
    })

    return successResponse(
      {
        messageId: savedMessage._id,
        notificationEmailId: notificationResult.data?.id ?? null,
        notificationEmailSent: true,
        autoReplyId: autoReplyResult.error ? null : autoReplyResult.data?.id ?? null,
        autoReplySent: !autoReplyResult.error,
        autoReplyError: autoReplyResult.error?.message ?? null,
      },
      201
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(error.issues[0]?.message ?? "Invalid contact payload")
    }

    return errorResponse("Failed to process contact request", 500)
  }
}
