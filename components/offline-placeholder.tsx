// @/components/shared/offline-placeholder.tsx

"use client";

import React from "react";
import { WifiOff } from "lucide-react";

/**
 * Comments in English: SVG icon component for cloud with slash (offline indicator)
 */
const CloudSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 mr-2 text-muted-foreground"
  >
    <path d="M2 2l20 20" />
    <path d="M5.48 5.48A8.03 8.03 0 0 0 4 12a8 8 0 0 0 14.3 4.3" />
    <path d="M12 12a8 8 0 0 1 7.7-4.3" />
    <path d="M20 16.5A4.5 4.5 0 0 0 15.5 12" />
  </svg>
);

export function OfflinePlaceholder() {


  const offlineMessage = "You're offline";
  const offlineDescription = "Please check your internet connection and try again.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="text-center max-w-md">


        {/* Offline message with icon */}
        <div className="flex items-center justify-center mb-4">
          <WifiOff />
          <p className="text-2xl font-semibold">{offlineMessage}</p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8">
          {offlineDescription}
        </p>

        
      </div>
    </div>
  );
}
