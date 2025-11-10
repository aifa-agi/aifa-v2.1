//components/aifa-footer.tsx
"use client"
import { appConfig } from "@/config/app-config"
import { GitHubLink } from "./github-link";
import { ModeSwitcher } from "./mode-switcher";


export default function AifaFooter() {
    const CURRENT_YEAR = new Date().getFullYear();


    return (

        <footer className="p-2 text-xs text-muted-foreground border-t border-white/10 bg-black/80 text-white/70">
            <div className=" hidden sm:flex w-full flex-row gap-1 justify-center items-center ">
                <div>All rights reserved.</div>
                <div>  {CURRENT_YEAR}</div>
                <div>©{" "}
                    <a
                        href="https://aifa.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                    >
                        {appConfig.short_name} {" "}
                    </a></div>
                <div>Enterprise-Grade AI NextJs starter</div>
            </div>

            <div className="  flex sm:hidden w-full flex-row gap-1 justify-between items-center px-2">
                <div/>
                <div>©{" "}
                        <a
                            href="https://aifa.dev"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                        >
                            {appConfig.short_name} {" "}
                        </a></div>
                <div>
                    <GitHubLink />
                    <ModeSwitcher />
                </div>

            </div>

        </footer>

    );
}
