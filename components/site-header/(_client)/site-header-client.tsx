"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { MenuCategory } from "@/types/menu-types"
import { LeftSlotHidden } from "@/components/left-slot-hidden"
import { MainNav } from "@/components/navigation-menu/main-nav"
import { GitHubLink } from "@/components/github-link"
import { ModeSwitcher } from "@/components/mode-switcher"
import { MobileNav } from "@/components/navigation-menu/mobile-nav"

interface SiteHeaderClientProps {
  appName: string
  appLogo: string
  categories: MenuCategory[]
}

export function SiteHeaderClient({
  appName,
  appLogo,
  categories,
}: SiteHeaderClientProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container px-6 mt-4">
        <div className="mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-sm">
          <div className="flex h-12 items-center justify-between px-2">
            <div className="flex items-center gap-3 ">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src={appLogo}
                  alt={appName}
                  className="h-8 w-8 rounded-full"
                />
                <span className="inline-block text-sm font-semibold text-white md:text-base">
                  {appName}
                </span>
              </Link>

              <div className="hidden h-6 w-px bg-white/20 lg:block" />

              <MainNav items={categories} className="hidden lg:flex" />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex">
                {/* <CommandMenu
                  tree={pageTree}
                  navItems={siteConfig.navItems}
                  blocks={blocks}
                /> */}
              </div>
              <GitHubLink />
              {/* <LeftSlotHidden className="hidden md:flex" /> */}
              <ModeSwitcher />
              <Button
                asChild
                size="sm"
                className="hidden rounded-full bg-white text-black hover:bg-white/90 sm:inline-flex"
              >
                <Link href="/login" className="flex items-center gap-1">
                  Login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <MobileNav
  categories={categories}
  className="flex lg:hidden"
/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
