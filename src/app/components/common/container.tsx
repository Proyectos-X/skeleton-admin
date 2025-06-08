import { cn } from "@/shared/utils"
import * as React from "react"


/**
 * This component is based on the `div` element and supports all of its props
 */
const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "card-elevation bg-background/60 w-full rounded-xl px-6 py-4",
        className
      )}
      {...props}
    />
  )
})
Container.displayName = "Container"

export { Container }
