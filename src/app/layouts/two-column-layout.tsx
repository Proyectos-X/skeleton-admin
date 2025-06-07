import { type ReactNode } from "react"
import { Outlet } from "react-router"

interface LayoutProps {
  children: [ReactNode, ReactNode] // [main, sidebar]
  hasOutlet?: boolean
}

export function TwoColumnPage({
  children,
  hasOutlet = true,
}: LayoutProps) {
  const [main, sidebar] = children

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-4">
        <div className="flex flex-col gap-4">{main}</div>

        <div className="flex flex-col gap-4">
          {sidebar}
        </div>
      </div>

      {hasOutlet && <Outlet />}
    </div>
  )
}
