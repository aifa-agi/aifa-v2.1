// @/components/site-config.tsx

"use client"

import * as React from "react"
import { GalleryHorizontalIcon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { useLayout } from "@/hooks/use-layout"
import { Button } from "./ui/button"

export function LeftSlotHidden({ className }: React.ComponentProps<typeof Button>) {
  const { layout, setLayout } = useLayout()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newLayout = layout === "fixed" ? "full" : "fixed"
        setLayout(newLayout)
        trackEvent({
          name: "set_layout",
          properties: { layout: newLayout },
        })
      }}
      className="group/toggle extend-touch-target size-8 text-white/70 hover:bg-white/10 hover:text-white"
      
      title="Hide chat"
    >
      <span className="sr-only">Hide chat</span>
      <GalleryHorizontalIcon />
    </Button>
  )
}