//app/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Clock, Users } from "lucide-react";
import { appConfig, getHomePageIllustration } from "@/config/app-config";
import { AnalyticsTracker } from "./(_components)/analytics-tracker";


export const dynamic = 'force-static';
export const revalidate = false;


export default function ThankYouPage() {
    // Get both theme illustrations for static generation
    const darkPath = getHomePageIllustration("dark");
    const lightPath = getHomePageIllustration("light");

    // Validate paths
    const darkSrc = darkPath && typeof darkPath === 'string' && darkPath.length > 0 ? darkPath : null;
    const lightSrc = lightPath && typeof lightPath === 'string' && lightPath.length > 0 ? lightPath : null;

    return (
        <>
            {/* Client component for analytics tracking */}
            <AnalyticsTracker />

            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="max-w-2xl w-full">
                    <div className="rounded-2xl shadow-2xl p-8 md:p-12 text-center ">
                        {/* Success Illustration (theme-aware via CSS) */}
                        <div className="mb-8">
                            {/* Dark theme illustration */}
                            {darkSrc && (
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 dark:block hidden">
                                    <Image
                                        src={darkSrc}
                                        alt="Success illustration"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Light theme illustration */}
                            {lightSrc && (
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 dark:hidden block">
                                    <Image
                                        src={lightSrc}
                                        alt="Success illustration"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Success checkmark */}
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" aria-hidden="true" />
                        </div>

                        {/* Main Content */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Thank You!
                            </h1>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                We&apos;ve received your request and will contact you soon.
                            </p>
                        </div>

                        {/* What Happens Next Section */}
                        <div className="bg-primary/10 rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-primary mr-2" />
                                <h2 className="text-xl font-semibold text-foreground">
                                    What Happens Next?
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Our team will review your request and reach out within 24 hours. Check your email for updates.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button
                                    className="px-8 py-3 text-base transition-all duration-200 hover:shadow-lg w-full sm:w-auto flex items-center justify-center"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>

                            <Link href="/chat">
                                <Button
                                    className="px-8 py-3 text-base transition-all duration-200 hover:shadow-lg w-full sm:w-auto"
                                    size="lg"
                                    variant="outline"
                                >
                                    Start Chat
                                </Button>
                            </Link>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    );
}
