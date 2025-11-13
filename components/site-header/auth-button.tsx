// components/site-header/auth-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Link from "next/link"
import { ArrowRight, LogOut } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/app/@left/(_AUTH)/login/(_client)/(_ui_components)/auth-login-form"
import { logoutAction } from "@/app/@left/(_AUTH)/login/(_server)/actions/auth"
import { initAuthState, useAuth } from "@/app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"

interface AuthButtonProps {
  initialAuth: boolean
}

/**
 * Authentication button for site header
 * 
 * Displays different UI based on:
 * - Authentication status (logged in vs logged out)
 * - Screen size (desktop vs mobile)
 * 
 * Features:
 * - Desktop: Link to /login page when logged out
 * - Mobile: Modal dialog with login form when logged out
 * - Both: Orange "Admin" button with logout when logged in
 * - Automatic redirect to /chat after successful login
 * - Syncs with global auth state
 * 
 * @param initialAuth - Initial authentication status from server
 */
export function AuthButton({ initialAuth }: AuthButtonProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Initialize auth state from server on mount
  React.useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])

  // Handle successful login from modal
  const handleLoginSuccess = () => {
    setOpen(false)
    
    // Redirect to chat after 2 seconds
    setTimeout(() => {
      router.push('/chat')
    }, 2000)
  }

  // Handle logout
  const handleLogout = async () => {
    logout() // Update client state immediately
    await logoutAction() // Clear cookie and redirect to home
  }

  // Authenticated state - orange admin button
  if (isAuthenticated) {
    return (
      <Button
        size="sm"
        className="rounded-full bg-orange-500 hover:bg-orange-600 text-white mr-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-1" />
        Admin
      </Button>
    )
  }

  // Desktop unauthenticated - link to login page
  if (isDesktop) {
    return (
      <Button
        asChild
        size="sm"
        className="rounded-full bg-white text-black hover:bg-white/70 mr-2"
      >
        <Link href="/login" className="flex items-center gap-1">
          Login
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    )
  }

  // Mobile unauthenticated - modal dialog with login form

  /**
 * ⚠️ CRITICAL: Login Form Routing Restrictions
 * 
 * 🚫 DO NOT implement login forms using Next.js intercepting routes (@modal patterns)
 * 
 * Why this matters:
 * 🔐 OAuth providers (Google, GitHub, Facebook, etc.) require full page navigation
 * 🔄 OAuth redirect callbacks cannot function properly within intercepted routes
 * 🍪 Cookie-based session management needs complete request/response cycles
 * 🔒 Security tokens and state parameters must persist across redirects
 * 
 * ✅ CORRECT APPROACH:
 * - Use dedicated route pages: /login, /auth/signin
 * - Implement server-side redirects after authentication
 * - Handle OAuth callbacks on full page routes
 * 
 * ❌ AVOID:
 * - Modal-based login with intercepting routes
 * - Client-side only authentication flows
 * - Mixing intercepting routes with OAuth providers
 * 
 * @see https://nextjs.org/docs/app/building-your-application/authentication
 * @see https://next-auth.js.org/configuration/pages
 */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="rounded-full bg-white text-black hover:bg-white/70 mr-2"
        >
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Login to your account</DialogTitle>
        <DialogDescription>
          Enter your email below to login to your account
        </DialogDescription>

        <LoginForm onSuccess={handleLoginSuccess} />
      </DialogContent>
    </Dialog>
  )
}
