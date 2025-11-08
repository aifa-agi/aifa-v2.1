"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedAIButtonProps {
  className?: string
  onClick?: () => void
}

export function AnimatedAIButton({
  className,
}: AnimatedAIButtonProps) {
  return (
    <Link
      href="/interception_chat"
      scroll={false}
      className={cn(
        "group relative z-0 mb-4 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-[12px] border-none bg-[#111] px-6 text-white outline-none transition-transform duration-300 active:scale-[0.98]",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-[3px] -z-[1] rounded-[14px] bg-[length:400%] blur-[6px]",
          "opacity-100",
         "animate-rotate-gradient",
          "brightness-125 saturate-125",
          "bg-gradient-to-r from-violet-600 via-fuchsia-500 via-pink-500 to-violet-600"
        )}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #7c3aed, #d946ef, #ec4899, #7c3aed)",
        }}
      />

      
      <span
        aria-hidden
        className="absolute inset-0 -z-[1] rounded-[12px] bg-[#111]"
      />

     
      <span className="relative z-10 inline-flex items-center justify-center gap-3 leading-none">
      
        <svg
          className="h-7 w-7 text-fuchsia-400 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            className="animate-sparkle-1"
          />
          <path
            d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
            className="animate-sparkle-2"
          />
          <path
            d="M6 15L6.5 17L8 17.5L6.5 18L6 20L5.5 18L4 17.5L5.5 17L6 15Z"
            className="animate-sparkle-3"
          />
        </svg>

        <span className="text-[15px] font-semibold tracking-wide">
          Learn More with AI
        </span>
      </span>
    </Link>
  )
}
