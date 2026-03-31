import { cn } from "@/lib/utils"

type FeedbackBannerProps = {
  type: "success" | "error"
  message: string
}

export function FeedbackBanner({ type, message }: FeedbackBannerProps) {
  return (
    <p
      role="status"
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        type === "success"
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      )}
    >
      {message}
    </p>
  )
}
