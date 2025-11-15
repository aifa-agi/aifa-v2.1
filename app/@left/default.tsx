//app/@left/default.tsx
import { Button } from "@/components/ui/button";
import { appConfig, getChatbotIllustration } from "@/config/app-config";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-static';
export const revalidate = false;

export default function DefaultPage() {
  // Get illustration paths
  const darkPath = getChatbotIllustration("dark");
  const lightPath = getChatbotIllustration("light");

  const darkSrc = darkPath && typeof darkPath === 'string' && darkPath.length > 0 ? darkPath : null;
  const lightSrc = lightPath && typeof lightPath === 'string' && lightPath.length > 0 ? lightPath : null;

  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-6 ">
      <div className="h-20"/>
      <p className="text-foreground text-4xl font-semibold whitespace-pre-wrap m-2 text-center">
        {appConfig.short_name}
      </p>

      {/* Chatbot illustrations (theme-aware) */}
      <div className="flex-1 flex items-center justify-center w-full">
        {/* Dark theme illustration */}
        {darkSrc && (
          <Image
            src={darkSrc}
            alt={appConfig.description}
            width={400}
            height={400}
           priority={false}
            className="rounded-lg object-cover dark:block hidden"
          />
        )}

        {/* Light theme illustration */}
        {lightSrc && (
          <Image
            src={lightSrc}
            alt={appConfig.description}
            width={400}
            height={400}
            priority={false}
            className="rounded-lg object-cover dark:hidden block"
          />
        )}
      </div>

      {/* CTA Button */}
      <Link href="/chat" className="text-xl w-full mt-auto mb-4">
        <Button className="w-full">{appConfig.chatBrand}</Button>
      </Link>
    </div>
  );
}
