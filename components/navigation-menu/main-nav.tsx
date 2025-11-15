// components/navigation-menu/main-nav.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { appConfig } from "@/config/app-config"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MenuCategory } from "@/types/menu-types"
import Image from "next/image"

interface MainNavProps {
  items: MenuCategory[]
  className?: string
}

/**
 * Helper: filter only published pages inside a category
 * Returns new category object with filtered pages
 */
function withPublishedPagesOnly(category: MenuCategory): MenuCategory {
  const safePages = category.pages ?? []

  const publishedPages = safePages.filter((page) => page?.isPublished === true)

  return {
    ...category,
    pages: publishedPages,
  }
}

export function MainNav({ items, className }: MainNavProps) {
  const pathname = usePathname()

  // Pre-filter categories to contain only published pages
  const categoriesWithPublishedPages = React.useMemo(() => {
    return (items ?? [])
      .map(withPublishedPagesOnly)
      .filter((category) => category.pages && category.pages.length > 0)
  }, [items])

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {categoriesWithPublishedPages.map((category) => {
          const lowerCaseTitle = (category.title ?? "").toLowerCase()
          const isActive = category.href ? pathname === category.href : false

          // Skip categories without pages after filtering
          if (!category.pages || category.pages.length === 0) {
            return null
          }

          // Special logic for "Home" category
          if (lowerCaseTitle === "home") {
            return (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white bg-transparent hover:bg-transparent",
                    isActive ? "text-white" : "text-white/70"
                  )}
                >
                  {category.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-auto w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none transition-colors hover:bg-accent focus:shadow-md rounded-md"
                          href="/"
                        >
                          <div className="mb-4 flex justify-center">
                            <Image
                              src={appConfig.logo}
                              alt={appConfig.name}
                              width={128}
                              height={128}
                              className="h-[128px] w-[128px] object-cover"
                              priority={false}
                  placeholder="blur"
                            />
                          </div>
                          <div className="mb-2 text-lg font-medium text-left capitalize">
                            {appConfig.short_name}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground line-clamp-6">
                            {appConfig.name}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {/* Show up to 10 published pages */}
                    {category.pages.slice(0, 10).map(
                      (page) =>
                        page.href && (
                          <ListItem
                            key={page.id}
                            href={page.href}
                            title={page.title ?? ""}
                            isActive={pathname === page.href}
                          >
                            {page.description}
                          </ListItem>
                        )
                    )}

                    {/* If more than 10 pages, show "View All" */}
                    {category.pages.length > 10 && category.href && (
                      <li className="col-span-1">
                        <Link
                          href={category.href}
                          className="block p-3 text-sm font-medium text-primary hover:text-primary/80 underline transition-colors"
                        >
                          View All
                        </Link>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // Default logic for all other categories
          return (
            <NavigationMenuItem key={category.title}>
              <NavigationMenuTrigger
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white bg-transparent hover:bg-transparent",
                  isActive ? "text-white" : "text-white/70"
                )}
              >
                {category.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {/* Show up to 10 published pages */}
                  {category.pages.slice(0, 10).map(
                    (page) =>
                      page.href && (
                        <ListItem
                          key={page.id}
                          title={page.title ?? ""}
                          href={page.href}
                          isActive={pathname === page.href}
                        >
                          {page.description}
                        </ListItem>
                      )
                  )}

                  {/* If more than 10 pages, show "View All" */}
                  {category.pages.length > 10 && category.href && (
                    <li className="col-span-full">
                      <Link
                        href={category.href}
                        className="block p-3 text-sm font-medium text-primary hover:text-primary/80 underline transition-colors"
                      >
                        View All
                      </Link>
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  isActive?: boolean
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps
>(({ className, title, children, href, isActive = false, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="line-clamp-1 text-sm font-medium leading-none capitalize">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
