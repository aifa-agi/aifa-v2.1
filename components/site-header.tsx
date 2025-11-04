// @/components/site-header.tsx

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ModeSwitcher } from "@/components/mode-switcher"

import { Button } from "@/components/ui/button"
import { appConfig } from "@/config/app-config"
import { Separator } from "./ui/separator"
import { LeftSlotHidden } from "./left-slot-hidden"


import { GitHubLink } from "./github-link"

export function SiteHeader() {
  
  return (
   <header className="fixed inset-x-0 z-50 ">
      <div className="container px-6 mt-4">
        <div className="mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-sm ">
          <div className="flex h-12 items-center justify-between px-2">
            {/* Left: Logo + Brand + Nav */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src={appConfig.logo}
                  alt={appConfig.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="inline-block text-sm font-semibold text-white md:text-base">
                  {appConfig.name}
                </span>
              </Link>

              {/* Vertical Line Separator */}
              <div className="hidden h-6 w-px bg-white/20 lg:block" />

              {/* Navigation Links */}
              {/* <MainNav items={siteConfig.navItems} className="hidden lg:flex" /> */}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex">
                {/* <CommandMenu
                  tree={pageTree}
                  navItems={siteConfig.navItems}
                  blocks={blocks}
                /> */}
              </div>
              <GitHubLink />
              <LeftSlotHidden className="md:flex hidden" />
           
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
              {/* <MobileNav
                tree={pageTree}
                items={siteConfig.navItems}
                className="flex lg:hidden"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}