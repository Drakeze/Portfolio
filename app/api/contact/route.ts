import { ZodError, z } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage } from "@/lib/domains/messages/service"
import { getContactRecipientEmail, getMailFrom, resend } from "@/src/lib/resend"

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const { name, email, message } = contactSchema.parse(await req.json())
    const savedMessage = await createMessage({
      name,
      email,
      message,
      read: false,
    })

    const to = getContactRecipientEmail()
    let notificationEmailSent = false
    let notificationEmailId: string | null = null
    let autoReplySent = false
    let autoReplyId: string | null = null
    let emailError: string | null = null

    if (resend && to) {
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
        emailError = notificationResult.error.message
      } else {
        notificationEmailSent = true
        notificationEmailId = notificationResult.data?.id ?? null
      }

      if (autoReplyResult.error) {
        emailError = emailError ?? autoReplyResult.error.message
      } else {
        autoReplySent = true
        autoReplyId = autoReplyResult.data?.id ?? null
      }
    } else {
      emailError = "Resend is not fully configured"
    }

    return successResponse(
      {
        messageId: savedMessage._id,
        notificationEmailId,
        notificationEmailSent,
        autoReplyId,
        autoReplySent,
        emailError,
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
