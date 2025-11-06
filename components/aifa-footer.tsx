"use client"
import { appConfig } from "@/config/app-config"


export default function AifaFooter() {
    const CURRENT_YEAR = new Date().getFullYear();


    return (
        <>
        <footer className="p-2 text-center text-xs text-muted-foreground border-t border-white/10 bg-black/80 text-white/70">
            © {CURRENT_YEAR} <a
                href="https://aifa.dev"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
            >
                {appConfig.short_name}
            </a>. All rights reserved.{" "}
            
        </footer>
        </>
    );
}
