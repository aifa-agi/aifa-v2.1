//app/@rightStatic/(_INTERCEPTION_MODAL)/interception_modal/lead-form/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { appConfig } from "@/config/app-config";
import { getModalTranslation } from "../../(_shared)/(_translations)/get-modal-translation";

// Client component with translation support
function LeadFormPageContent() {
  const { t } = getModalTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full">
        <div className="bg-background border border-border rounded-lg shadow-lg p-8 text-center">
          {/* Icon section */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Title and description */}
            <h1 className="text-2xl font-bold mb-2">
              {appConfig.short_name}
            </h1>
            <p className="text-muted-foreground">
              {appConfig.description}
            </p>
          </div>

          {/* Navigation button */}
          <Link href="/home">
            <Button
              className="px-8 py-3 text-base w-full
                        transition-all duration-200 hover:shadow-lg"
            >
              {t("Go to Homepage")}
            </Button>
          </Link>

          {/* Help text */}
          <p className="text-sm text-muted-foreground mt-4">
            {t("Use Form on Homepage")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LeadFormPage() {
  // Return client component with translation support
  return <LeadFormPageContent />;
}
