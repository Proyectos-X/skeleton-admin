import { type PropsWithChildren, useState } from "react"
import { StackedModalContext } from "./stacked-modal-context"

/**
 * Props que recibe `StackedModalProvider`.
 *
 * @typedef StackedModalProviderProps
 * @property {React.ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 * @property {(open: boolean) => void} onOpenChange - Callback que se dispara cuando cambia el estado abierto/cerrado de cualquier modal.
 */
type StackedModalProviderProps = PropsWithChildren<{
  onOpenChange: (open: boolean) => void
}>

/**
 * `StackedModalProvider`
 *
 * Proveedor de contexto que gestiona múltiples modales apilados por medio de identificadores únicos.
 * Cada modal registrado puede consultar su estado (`abierto`/`cerrado`) y actualizarlo,
 * lo cual permite comportamientos como deshabilitar la capa de fondo o ajustar estilos visuales
 * cuando hay más de un modal visible.
 *
 * @param {StackedModalProviderProps} props - Props con hijos y callback de cambio de apertura.
 * @returns {JSX.Element} Proveedor de contexto `StackedModalContext`.
 *
 * @example
 * <StackedModalProvider onOpenChange={(isOpen) => console.log(isOpen)}>
 *   <MyModal />
 * </StackedModalProvider>
 */
export const StackedModalProvider = ({
  children,
  onOpenChange,
}: StackedModalProviderProps) => {
  // Estado interno que asocia IDs únicos de modal con su estado abierto/cerrado
  const [state, setState] = useState<Record<string, boolean>>({})

  /**
   * Retorna si un modal específico está abierto
   * @param id - Identificador único del modal
   */
  const getIsOpen = (id: string) => {
    return state[id] || false
  }

  /**
   * Establece el estado de apertura de un modal
   * @param id - Identificador único del modal
   * @param open - Valor booleano (true = abierto)
   */
  const setIsOpen = (id: string, open: boolean) => {
    setState((prevState) => ({
      ...prevState,
      [id]: open,
    }))

    onOpenChange(open)
  }

  /**
   * Registra un modal en el estado con valor inicial `false` (cerrado)
   * @param id - Identificador único del modal
   */
  const register = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      [id]: false,
    }))
  }

  /**
   * Elimina un modal del estado cuando se desmonta
   * @param id - Identificador único del modal
   */
  const unregister = (id: string) => {
    setState((prevState) => {
      const newState = { ...prevState }
      delete newState[id]
      return newState
    })
  }

  return (
    <StackedModalContext.Provider
      value={{
        getIsOpen,
        setIsOpen,
        register,
        unregister,
      }}
    >
      {children}
    </StackedModalContext.Provider>
  )
}
