// components/dynamic-overlay.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { initAuthState, useAuth } from "@/hooks/auth-state"

interface DynamicOverlayProps {
  initialAuth: boolean
  className?: string
}

/**
 * Dynamic content overlay for authenticated users
 * 
 * Client Component that overlays static content when user is authenticated.
 * Uses absolute positioning to cover the entire parent container (ResizablePanel).
 * 
 * Features:
 * - Subscribes to global auth state for real-time updates
 * - Hides automatically when user logs out
 * - Full-screen overlay with proper z-index layering
 * - Accessible with proper ARIA attributes
 * 
 * @param initialAuth - Initial authentication state from server
 */
export function DynamicOverlay({ initialAuth, className }: DynamicOverlayProps) {
  const { isAuthenticated } = useAuth()

  // Initialize auth state from server on mount
  React.useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])

  // Hide overlay if user is not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div
      className={cn(
        // Absolute positioning to overlay static content
        "absolute inset-0 z-50",
        // Background and styling
        "bg-background",
        // Scrollable content
        "overflow-y-auto hide-scrollbar",
        className
      )}
      role="main"
      aria-label="Dynamic admin content"
    >
      <div className="container mx-auto p-6">
        {/* Admin Panel Header */}
        <div className="mb-8">
          <div className="h-24"/>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome to the dynamic admin panel. This content is only visible to authenticated users.
          </p>
        </div>

        {/* Placeholder content - replace with your actual admin components */}
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Dynamic Content Area</h2>
            <p className="text-muted-foreground mb-4">
              This is where your admin-specific components will be rendered.
              Examples: Chat interface, admin controls, dynamic data tables, etc.
            </p>
            <div className="flex gap-2">
              <div className="h-20 w-20 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="h-20 w-20 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div className="h-20 w-20 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-2">Real-time Features</h3>
            <p className="text-sm text-muted-foreground">
              Add your chat, notifications, or other dynamic features here.
              This overlay will automatically hide when the user logs out.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
