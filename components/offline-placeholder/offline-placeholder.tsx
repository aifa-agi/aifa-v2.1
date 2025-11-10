//components/offline-placeholder/offline-placeholder.tsx
"use client";

import React from "react";
import { WifiOff } from "lucide-react";
import { getOfflineTranslation } from "./offline-translation";

export function OfflinePlaceholder() {
  const { t } = getOfflineTranslation();

  const offlineMessage = t("Offline Message") || "You're offline";
  const offlineDescription = t("Offline Description") || "Please check your internet connection and try again.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-4">
          <WifiOff className="w-6 h-6 mr-2" />
          <p className="text-2xl font-semibold">{offlineMessage}</p>
        </div>
        <p className="text-muted-foreground text-lg mb-8">
          {offlineDescription}
        </p>
      </div>
    </div>
  );
}
