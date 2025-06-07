import { createContext } from "react"

/**
 * Tipo que define el estado compartido para los modales enroutables.
 *
 * @typedef RouteModalProviderState
 * @property {(path?: string) => void} handleSuccess - Función para cerrar el modal correctamente y redirigir al path anterior o proporcionado.
 * @property {(value: boolean) => void} setCloseOnEscape - Controla si el modal se puede cerrar presionando la tecla Escape.
 * @property {{ closeOnEscape: boolean }} __internal - Propiedades internas del modal, usadas para validaciones o comportamiento de cierre personalizado.
 */
type RouteModalProviderState = {
  handleSuccess: (path?: string) => void
  setCloseOnEscape: (value: boolean) => void
  __internal: {
    closeOnEscape: boolean
  }
}

/**
 * Contexto de React para gestionar el comportamiento y estado de un modal enroutable.
 *
 * Este contexto debe ser utilizado dentro de un `RouteModalProvider` y proporciona:
 * - Una función para cerrar el modal correctamente (`handleSuccess`)
 * - Una función para permitir o evitar cierre con Escape (`setCloseOnEscape`)
 * - Un campo interno de configuración (`__internal`)
 *
 * @example
 * const { handleSuccess } = useContext(RouteModalProviderContext)!
 * handleSuccess("/ruta-final")
 */
export const RouteModalProviderContext =
  createContext<RouteModalProviderState | null>(null)
