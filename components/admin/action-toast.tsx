"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

type ActionToastProps = {
  status?: string
  message?: string
}

export function ActionToast({ status, message }: ActionToastProps) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!status || !message) return

    const formatted = decodeURIComponent(message)

    if (status === "success") {
      toast.success(formatted)
    } else {
      toast.error(formatted)
    }

    router.replace(pathname, { scroll: false })
  }, [status, message, pathname, router])

  return null
}
