import { useContext } from "react"
import { RouteModalProviderContext } from "./route-modal-context"

/**
 * useRouteModal
 *
 * Hook personalizado que permite acceder al contexto del modal enroutable
 */
export const useRouteModal = () => {
  const context = useContext(RouteModalProviderContext)

  if (!context) {
    throw new Error("useRouteModal must be used within a RouteModalProvider")
  }

  return context
}
