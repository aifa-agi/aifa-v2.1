//app/@left/loading.tsx
import { appConfig, getLoadingIllustration } from "@/config/app-config";
import Image from "next/image";

export const dynamic = 'force-static';
export const revalidate = false;


export default function LoadingPage() {
  // Get illustration paths
  const darkPath = getLoadingIllustration("dark");
  const lightPath = getLoadingIllustration("light");

  const darkSrc = darkPath && typeof darkPath === 'string' && darkPath.length > 0 ? darkPath : null;
  const lightSrc = lightPath && typeof lightPath === 'string' && lightPath.length > 0 ? lightPath : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Dark theme illustration */}
      {darkSrc && (
        <Image
          src={darkSrc}
          alt="Loading illustration"
          width={400}
          height={400}
         priority={false}
          className="pointer-events-none mb-5 mt-6 dark:block hidden"
        />
      )}

      {/* Light theme illustration */}
      {lightSrc && (
        <Image
          src={lightSrc}
          alt="Loading illustration"
          width={400}
          height={400}
          priority={false}
          className="pointer-events-none mb-5 mt-6 dark:hidden block"
        />
      )}

      {/* Welcome text */}
      <p className="text-foreground text-2xl font-semibold whitespace-pre-wrap mx-4 text-center">
        Welcome to {appConfig.short_name} with {appConfig.chatBrand}
      </p>

      {/* Loading message */}
      <p className="text-muted-foreground text-xl mt-4">
        {appConfig.messages?.loading?.title || "Loading..."}
      </p>
    </div>
  );
}
