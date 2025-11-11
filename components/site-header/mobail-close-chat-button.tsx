//components/site-header/mobail-close-chat-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export function MobailCloseChatButton() {

    const router = useRouter()

    const closeChat = () => {
        router.back()
    }

    return (
        <Button
            onClick={closeChat}
            size="sm"
            className="rounded-full bg-white text-black hover:bg-white/70 mr-2"
        >
            Close chat
        </Button>

    )
}
