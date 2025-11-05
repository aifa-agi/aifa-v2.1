"use client"

import * as React from "react"
import Link from "next/link"

import { appConfig } from "@/config/app-config"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MenuCategory } from "@/types/menu-types"

interface MainNavProps {
  items: MenuCategory[]
  className?: string
}

export function MainNav({ items, className }: MainNavProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {items.map((category) => {
          const lowerCaseTitle = category.title.toLowerCase()

          // 1. Правило для 'home'
          if (lowerCaseTitle === "home" && category.pages?.length) {
            return (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <img
                            src={appConfig.logo}
                            alt={appConfig.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {appConfig.name}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {appConfig.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {category.pages.map(
                      (page) =>
                        page.href && (
                          <ListItem
                            key={page.id}
                            href={page.href}
                            title={page.title ?? ""}
                          >
                            {page.description}
                          </ListItem>
                        )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // 2. Правило для 'blog', 'news', 'docs'
          if (
            ["blog", "news", "docs"].includes(lowerCaseTitle) &&
            category.href
          ) {
            return (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={category.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {category.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // 4. Правило для 'admin'
          if (lowerCaseTitle === "admin" && category.pages?.length) {
            return (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    {category.pages.map(
                      (page) =>
                        page.href && (
                          <li key={page.id}>
                            <NavigationMenuLink asChild>
                              <Link href={page.href}>{page.title}</Link>
                            </NavigationMenuLink>
                          </li>
                        )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // 3. Правило для остальных категорий
          if (category.pages && category.pages.length > 0) {
            return (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-full gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {category.pages.map(
                      (page) =>
                        page.href && (
                          <ListItem
                            key={page.id}
                            title={page.title ?? ""}
                            href={page.href}
                          >
                            {page.description}
                          </ListItem>
                        )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="line-clamp-1 text-sm font-medium leading-none">
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
