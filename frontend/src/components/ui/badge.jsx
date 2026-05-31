import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-neutral-900 text-neutral-50",
    secondary: "bg-neutral-100 text-neutral-900",
    destructive: "bg-red-500 text-neutral-50",
    outline: "border border-neutral-200 text-neutral-900",
    success: "text-neutral-900",
    warning: "text-neutral-900",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }