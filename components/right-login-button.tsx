"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { X } from "lucide-react" // Импортируем иконку X

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// Импортируем PopoverClose напрямую из Radix UI
import { Close as PopoverClose } from "@radix-ui/react-popover"

export function RightLoginButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="rounded-full bg-white text-black hover:bg-white/90 mr-2"
        >
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100 px-4"
        align="center"
        side="bottom"
        alignOffset={-16}
        sideOffset={24}
      >
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="relative">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              {/* Кнопка закрытия в правом верхнем углу */}
              <PopoverClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-5 top-0 h-6 w-6 rounded-full hover:bg-destructive/10"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </PopoverClose>
            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <Button type="submit">Login</Button>
                    <Button variant="outline" type="button">
                      Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="#">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </PopoverContent>
    </Popover>
  )
}
