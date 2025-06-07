import { createContext } from "react"

/**
 * Representa las funciones que gestionan el estado de modales apilados (stacked modals).
 *
 * Esta interfaz permite coordinar múltiples modales en pantalla, asegurando que
 * cada uno conozca si está activo o debe ajustar su presentación (como `z-index`, desplazamiento, etc.).
 *
 * @typedef {Object} StackedModalState
 * @property {(id: string) => boolean} getIsOpen - Devuelve si un modal específico está abierto.
 * @property {(id: string, open: boolean) => void} setIsOpen - Establece el estado abierto/cerrado para un modal por su ID.
 * @property {(id: string) => void} register - Registra un nuevo modal con un ID único.
 * @property {(id: string) => void} unregister - Elimina el modal registrado del estado interno.
 */
type StackedModalState = {
  getIsOpen: (id: string) => boolean
  setIsOpen: (id: string, open: boolean) => void
  register: (id: string) => void
  unregister: (id: string) => void
}

/**
 * `StackedModalContext`
 *
 * Contexto global que expone funciones para gestionar el estado de modales apilados.
 * Utilizado por `StackedModalProvider` y consumido por `useStackedModal`.
 *
 * @example
 * const { register, setIsOpen } = useContext(StackedModalContext)!
 */
export const StackedModalContext = createContext<StackedModalState | null>(null)
