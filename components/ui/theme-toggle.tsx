"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        aria-hidden="true"
        className={`h-5 w-5 transition-transform duration-200 ${mounted && isDark ? "scale-0" : "scale-100"}`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute h-5 w-5 transition-transform duration-200 ${mounted && isDark ? "scale-100" : "scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
