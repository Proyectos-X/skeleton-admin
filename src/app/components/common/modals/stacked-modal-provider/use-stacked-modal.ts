import { useContext } from "react"
import { StackedModalContext } from "./stacked-modal-context"

/**
 * Hook que permite acceder al contexto de `StackedModalProvider`.
 *
 * Este hook proporciona acceso a las funciones de registro, apertura y cierre
 * de modales apilados gestionados por el contexto `StackedModalContext`.
 */
export const useStackedModal = () => {
  const context = useContext(StackedModalContext)

  if (!context) {
    throw new Error(
      "useStackedModal must be used within a StackedModalProvider"
    )
  }

  return context
}
