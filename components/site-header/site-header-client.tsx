//components/site-header/site-header-wrapper.tsx// components/site-header/site-header-client.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/navigation-menu/main-nav"
import { GitHubLink } from "@/components/github-link"
import { ModeSwitcher } from "@/components/mode-switcher"
import { MobileNav } from "@/components/navigation-menu/mobile-nav"
import { AuthButton } from "@/components/site-header/auth-button"
import { appConfig } from "@/config/app-config"
import { contentData } from "@/config/content-data"
import { initAuthState, useAuth } from "@/app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"
import { usePathname } from "next/navigation"
import { MobailCloseChatButton } from "./mobail-close-chat-button"
import dynamic from "next/dynamic"

interface SiteHeaderClientProps {
  initialAuth: boolean
}

/**
 * Site header - Client Component
 * 
 * Renders the main navigation header with reactive authentication state.
 * Subscribes to global auth state and automatically shows/hides navigation
 * based on authentication status.
 * 
 * Features:
 * - Initializes auth state from server on mount
 * - Subscribes to auth changes via useAuth()
 * - Conditionally renders navigation for unauthenticated users
 * - Always shows logo, theme switcher, and auth button
 * 
 * @param initialAuth - Initial authentication status from server
 */
export function SiteHeaderClient({ initialAuth }: SiteHeaderClientProps) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [shouldShowCloseChat, setShouldShowCloseChat] = React.useState(false)
const PWAInstallPrompt = dynamic(
  () => import('@/components/pwa-install-prompt').then(mod => mod.PWAInstallPrompt),
  { ssr: false } 
)
  React.useEffect(() => {
  const update = () => {
    const current = typeof window !== 'undefined' ? window.location.pathname : pathname
    setShouldShowCloseChat(current.includes("interception_chat"))
  }

  // Initial sync on mount and on pathname change
  update()

  // Fallback for back/forward without immediate pathname change in intercepted routes
  window.addEventListener('popstate', update)
  return () => window.removeEventListener('popstate', update)
}, [pathname])


  // Initialize auth state from server on mount
  React.useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])

  
   
  return (
    <header className="fixed inset-x-0 top-0 z-100">
      <div className="container px-6 mt-4">
        <div className="mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-sm">
          <div className="flex h-12 items-center justify-between px-2">
            {/* Left section - Logo and Navigation */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ?
              <Link href="/home" className="flex items-center gap-2">
                <Image
                  src={appConfig.logo}
                  alt={`${appConfig.name} image`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                 
                />
                <span className="inline-block text-sm font-semibold text-white md:text-base">
                  {appConfig.short_name}
                </span>
              </Link>: <Link href="/" className="flex items-center gap-2">
                <Image
                  src={appConfig.logo}
                  alt={`${appConfig.name} image`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
                <span className="inline-block text-sm font-semibold text-white md:text-base">
                  {appConfig.short_name}
                </span>
              </Link>}


              {/* Navigation - hidden when authenticated */}
              {!isAuthenticated && (
                <>
                  <div className="hidden h-6 w-px bg-white/20 lg:block" />
                  <MainNav
                    items={contentData.categories}
                    className="hidden lg:flex"
                  />
                </>
              )}
            </div>

            {/* Right section - Controls */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex">
                <GitHubLink />
              </div>

              <div className="hidden sm:flex">
                <ModeSwitcher />
              </div>

              {!isAuthenticated && shouldShowCloseChat ? (
                <MobailCloseChatButton/>):(
              <AuthButton initialAuth={initialAuth} />)}

              {/* Mobile navigation - hidden when authenticated */}
              {!isAuthenticated && (
                <MobileNav
                  categories={contentData.categories}
                  className="flex lg:hidden"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {process.env.NODE_ENV === "production" && (
                <PWAInstallPrompt />
              )}
      
    </header>
  )
}
