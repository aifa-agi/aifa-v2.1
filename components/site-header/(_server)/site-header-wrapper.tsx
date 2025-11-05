import { appConfig } from "@/config/app-config"
import { SiteHeaderClient } from "../(_client)/site-header-client"
import { contentData } from "@/config/content/content-data"

export function SiteHeader() {
  return (
    <SiteHeaderClient
      appName={appConfig.name}
      appLogo={appConfig.logo}
      categories={contentData.categories}
    />
  )
}
