"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MenuCategory } from "@/types/menu-types"
import Image from "next/image"
import { appConfig } from "@/config/app-config"

interface MobileNavProps {
  categories: MenuCategory[]
  className?: string
}

export function MobileNav({
  categories,
  className,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2 pr-2 pl-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <span className="flex h-8 items-center text-base leading-none font-medium text-white">
            Menu
          </span>
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-white transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-white transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-6 overflow-auto px-6 py-6">
          {/* Отображаем каждую категорию */}
          {categories.map((category) => {
            const lowerCaseTitle = category.title.toLowerCase()
            const isActive = category.href ? pathname === category.href : false

            // Пропускаем категории без страниц
            if (!category.pages || category.pages.length === 0) {
              return null
            }

            // Специальная логика для категории "Home"
            if (lowerCaseTitle === "home") {
              return (
                <div key={category.title} className="flex flex-col gap-4">
                  <div className="text-muted-foreground text-sm font-medium">
                    {category.title}
                  </div>

                  {/* Основной блок с логотипом и описанием */}
                  <Link
                    href="/"
                    className={cn(
                      "flex flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none transition-colors hover:bg-accent",
                      pathname === "/" && "bg-accent"
                    )}
                  >
                    <div className="mb-3 flex justify-center">
                      <Image
                        src={appConfig.logo}
                        alt={appConfig.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="mb-2 text-base font-medium text-left capitalize">
                      {appConfig.name}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground line-clamp-4">
                      {appConfig.description}
                    </p>
                  </Link>

                  {/* Список страниц категории (максимум 10) */}
                  <div className="flex flex-col gap-3">
                    {category.pages.slice(0, 10).map(
                      (page) =>
                        page.href && (
                          <MobileNavLink
                            key={page.id}
                            href={page.href}
                            onOpenChange={setOpen}
                            isActive={pathname === page.href}
                          >
                            <div className="text-sm font-medium capitalize">
                              {page.title}
                            </div>
                            {page.description && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {page.description}
                              </p>
                            )}
                          </MobileNavLink>
                        )
                    )}
                  </div>

                  {/* Кнопка "View All" если страниц больше 10 */}
                  {category.pages.length > 10 && category.href && (
                    <Link
                      href={category.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-primary hover:text-primary/80 underline transition-colors"
                    >
                      View All
                    </Link>
                  )}
                </div>
              )
            }

            // Логика для остальных категорий
            return (
              <div key={category.title} className="flex flex-col gap-4">
                <div className="text-muted-foreground text-sm font-medium">
                  {category.title}
                </div>

                {/* Список страниц категории (максимум 10) */}
                <div className="flex flex-col gap-3">
                  {category.pages.slice(0, 10).map(
                    (page) =>
                      page.href && (
                        <MobileNavLink
                          key={page.id}
                          href={page.href}
                          onOpenChange={setOpen}
                          isActive={pathname === page.href}
                        >
                          <div className="text-sm font-medium capitalize">
                            {page.title}
                          </div>
                          {page.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {page.description}
                            </p>
                          )}
                        </MobileNavLink>
                      )
                  )}
                </div>

                {/* Кнопка "View All" если страниц больше 10 */}
                {category.pages.length > 10 && category.href && (
                  <Link
                    href={category.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-primary hover:text-primary/80 underline transition-colors"
                  >
                    View All
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Компонент для отдельной ссылки в мобильной навигации
interface MobileNavLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  isActive?: boolean
}

function MobileNavLink({
  href,
  onOpenChange,
  className,
  children,
  isActive = false,
  ...props
}: MobileNavLinkProps) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href)
        onOpenChange?.(false)
      }}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
