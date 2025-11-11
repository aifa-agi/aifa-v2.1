//app/@rightDynamic/[...slug]/page.tsx

"use client"

import { ChartAreaInteractive } from "../(_client)/charts/chart-area-interactive"

export default function RightDynamicRoute() {
  console.log("RightDynamicPage")
  return (<>
    <div className="container mx-auto p-6">
      {/* Admin Panel Header */}
      <div className="mb-8">
        <div className="h-24" />
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to the dynamic admin panel. This content is only visible to authenticated users.
        </p>
      </div>

      {/* Interactive Chart */}
      <div className="grid gap-6">
        <ChartAreaInteractive />

        {/* Additional admin features can be added here */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Real-time Features</h3>
          <p className="text-sm text-muted-foreground">
            Add your chat, notifications, or other dynamic features here.
            This overlay will automatically hide when the user logs out.
          </p>
        </div>
      </div>
    </div>
  </>
  )
}
