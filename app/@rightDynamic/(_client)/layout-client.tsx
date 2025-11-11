//app/@rightDynamic/(_client)/layout-client.tsx
"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { initAuthState, useAuth } from "@/app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"

interface RightDynamicLayoutClientProps {
    children: React.ReactNode
    initialAuth: boolean
}

export function RightDynamicLayoutClient({
    children,
    initialAuth
}: RightDynamicLayoutClientProps) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Initialize auth state from server
    useEffect(() => {
        initAuthState(initialAuth)
    }, [initialAuth])
    // Hide overlay if user is not authenticated
    if (!isAuthenticated) {
        return null
    }


    return <>
        <div
            className="absolute inset-0 z-50 bg-background overflow-y-auto hide-scrollbar"
            role="main"
            aria-label="Dynamic admin content"
        >{children}
        </div>
    </>
}