// app/@right/@modal/(...)interception_modal/lead-form/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslationModal } from "@/app/@right/(_INTERCEPTION_MODAL)/(_shared)/(_translations)/translation";

type FormErrors = {
  name?: string[];
  phone?: string[];
  email?: string[];
};

type ApiResponse = {
  success: boolean;
  message?: string;
  errors?: FormErrors;
  mock?: boolean;
};



export default function LeadFormModal() {
  const router = useRouter();
  const { t } = useTranslationModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string>("");

  // Close modal when clicking on overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  // Close modal and navigate back
  const handleClose = () => {
    router.back();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    try {
      // Send POST request to API route
      const response = await fetch("/api/lead-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      // Handle successful submission
      if (result.success) {
        setIsSuccess(true);
        // Auto close modal after 3 seconds
        setTimeout(() => {
          router.back();
        }, 3000);
      } else {
        // Handle validation or submission errors
        if (result.errors) {
          setErrors(result.errors);
        }
        if (result.message) {
          setMessage(result.message);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage(t("Submit Error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div
          className="bg-background rounded-lg shadow-2xl relative w-full max-w-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t("Close")}
          >
            <X size={24} />
          </button>

          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              {t("Lead Form Submitted")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("Lead Form Thank You")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("Auto Close Window")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-background rounded-lg shadow-2xl relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label={t("Close")}
        >
          <X size={24} />
        </button>

        <div className="p-6">
          {/* Header section */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{t("Try Free")}</h2>
            <p className="text-muted-foreground">{t("Free Access Description")}</p>
          </div>

          {/* Form element */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                {t("Name")} {t("Required Field")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground"
                placeholder={t("Name Placeholder")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name[0]}
                </p>
              )}
            </div>

            {/* Phone field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2"
              >
                {t("Phone")} {t("Required Field")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground"
                placeholder={t("Phone Placeholder")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.phone[0]}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                {t("Email")} {t("Required Field")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground"
                placeholder={t("Email Placeholder")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email[0]}
                </p>
              )}
            </div>

            {/* Error message alert */}
            {message && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md">
                <p className="text-sm text-destructive">{message}</p>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-base font-medium
                          transition-all duration-200 hover:shadow-lg
                          disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    {t("Sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t("Submit Lead")}
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Privacy notice */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("Privacy Agreement")}
          </p>
        </div>
      </div>
    </div>
  );
}
