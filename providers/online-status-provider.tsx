//online-status-provider.tsx

"use client";


import { OfflinePlaceholder } from "@/components/offline-placeholder/offline-placeholder";
import { useOnlineStatus } from "@/hooks/use-online-status";
import React from "react";

export function OnlineStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOnline = useOnlineStatus();
  return isOnline ? <>{children}</> : <OfflinePlaceholder />;
}
