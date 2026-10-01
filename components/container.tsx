import { cn } from "@/lib/utils"
import type React from "react"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-20", className)}>
      {children}
    </Tag>
  )
}
