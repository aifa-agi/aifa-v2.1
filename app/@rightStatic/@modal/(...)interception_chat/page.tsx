//app/@rightStatic/@modal/(...)interception_chat/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ChatExample from "@/components/chat-example/chat-example";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { appConfig } from "@/config/app-config";

export default function ChatDrawerModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Trigger slide-in animation after mount
  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Close drawer with slide-out animation
  const handleClose = () => {
    setIsOpen(false);
    // Wait for animation to complete before navigating back
    setTimeout(() => {
      router.back();
    }, 300); // Match transition duration
  };

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer panel sliding from left */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-full max-w-[100%] bg-background shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="fixed inset-x-0 top-0 z-30">
      <div className="container px-6 mt-4">
        <div className="mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-sm">
          <div className="flex h-12 items-center justify-between px-2">
            <div className="flex items-center gap-3 ">
              <div className="flex items-center gap-2">
                <Image
                  src={appConfig.logo}
                  alt={appConfig.short_name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
                <span className="inline-block text-sm font-semibold text-white md:text-base">
                 {appConfig.short_name}
                </span>
              </div>

            </div>

            <div className="flex items-center gap-2">
              

             
              <Button
                onClick={handleClose}
                size="sm"
                className="rounded-full bg-white text-black hover:bg-white/70 sm:inline-flex  "
              aria-label="Close chat"
              >
                Close chat
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </div>

        <ChatExample />
      </div>
    </>
  );
}
