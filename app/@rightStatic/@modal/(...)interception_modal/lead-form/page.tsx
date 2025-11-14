//app/@rightStatic/@modal/(...)interception_modal/lead-form/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getModalTranslation } from "@/app/@rightStatic/(_INTERCEPTION_MODAL)/(_shared)/(_translations)/get-modal-translation";

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
  console.log("(...)interception_modal/lead-form/page.tsx loaded"); 

  const router = useRouter();
  const { t } = getModalTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string>("");


  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => {
      console.log("[Modal] Success! Closing modal and redirecting to /thank-you");

      setTimeout(() => {
        router.push("/thank-you");
      }, 50);

    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess, router]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (isSubmitting || isSuccess) {
        return;
      }
      router.back();
    }
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    try {
      const response = await fetch("/api/lead-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        console.log("[Modal] Form submitted successfully");
        setIsSuccess(true);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        if (result.message) {
          setMessage(result.message);
        }
      }
    } catch (error) {
      console.error("[Modal] Submit error:", error);
      setMessage(t("Submit Error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div
          className="bg-background rounded-lg shadow-2xl relative w-full max-w-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
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

  return (
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{t("Try Free")}</h2>
            <p className="text-muted-foreground">{t("Free Access Description")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground
                          disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t("Name Placeholder")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name[0]}
                </p>
              )}
            </div>

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
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground
                          disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t("Phone Placeholder")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.phone[0]}
                </p>
              )}
            </div>

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
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                          bg-background text-foreground
                          placeholder:text-muted-foreground
                          disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t("Email Placeholder")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email[0]}
                </p>
              )}
            </div>

            {message && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md">
                <p className="text-sm text-destructive">{message}</p>
              </div>
            )}

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

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("Privacy Agreement")}
          </p>
        </div>
      </div>
    </div>
  );
}
