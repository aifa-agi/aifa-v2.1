//app/@rightDynamic/layout.tsx

import { isAuthenticated } from "../@left/(_AUTH)/login/(_server)/actions/auth"
import { RightDynamicLayoutClient } from "./(_client)/layout-client"


export default async function RightDynamicLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const authenticated = await isAuthenticated()
  
  return (
    <RightDynamicLayoutClient initialAuth={authenticated}>
      {children}
    </RightDynamicLayoutClient>
  )
}
