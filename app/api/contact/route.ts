import { Resend } from "resend"
import { ZodError, z } from "zod"

import { errorResponse, successResponse } from "@/lib/api/responses"
import { createMessage } from "@/lib/domains/messages/service"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

function getRecipientEmail() {
  return process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL ?? process.env.RESEND_TO_EMAIL
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = contactSchema.parse(await req.json())
    const to = getRecipientEmail()

    if (!resend || !to) {
      return errorResponse("Contact email is not configured", 500)
    }

    const emailResult = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      subject: `New Portfolio Contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (emailResult.error) {
      return errorResponse("Failed to send email", 502)
    }

    const savedMessage = await createMessage({
      name,
      email,
      message,
      read: false,
    })

    return successResponse(
      {
        messageId: savedMessage._id,
        emailId: emailResult.data?.id ?? null,
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
