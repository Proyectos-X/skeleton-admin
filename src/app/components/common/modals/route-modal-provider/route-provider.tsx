import { type PropsWithChildren, useCallback, useMemo, useState } from "react"
import { type Path, useNavigate } from "react-router"
import { RouteModalProviderContext } from "./route-modal-context"

/**
 * Props del `RouteModalProvider`
 * @typedef {Object} RouteModalProviderProps
 * @property {string | Partial<Path>} prev - Ruta a la que se debe volver después de cerrar el modal.
 */
type RouteModalProviderProps = PropsWithChildren<{
  prev: string | Partial<Path>
}>

/**
 * RouteModalProvider
 *
 * Este provider encapsula el estado compartido para un modal enroutable.
 *
 * Internamente expone el estado `closeOnEscape` dentro de `__internal`
 * para que el modal pueda decidir si prevenir o no el cierre con Escape.
 *
 * @param {RouteModalProviderProps} props - Los hijos y ruta previa.
 * @returns {JSX.Element} Context provider que debe envolver el contenido del modal.
 *
 */
export const RouteModalProvider = ({
  prev,
  children,
}: RouteModalProviderProps) => {
  const navigate = useNavigate()

  // Estado para controlar si el modal se puede cerrar con Escape
  const [closeOnEscape, setCloseOnEscape] = useState(true)

  /**
   * handleSuccess
   * Navega de regreso a `prev` o a una ruta proporcionada,
   * marcando la transición como exitosa en el state del router.
   */
  const handleSuccess = useCallback(
    (path?: string) => {
      const to = path || prev
      navigate(to, {
        replace: true,
        state: { isSubmitSuccessful: true }, // usado por `useBlocker` para no bloquear cierre
      })
    },
    [navigate, prev]
  )

  /**
   * Memoizamos el valor del contexto para evitar renders innecesarios
   */
  const value = useMemo(
    () => ({
      handleSuccess,
      setCloseOnEscape,
      __internal: { closeOnEscape }, // uso interno: permite o no cerrar con Escape
    }),
    [handleSuccess, closeOnEscape]
  )

  return (
    <RouteModalProviderContext.Provider value={value}>
      {children}
    </RouteModalProviderContext.Provider>
  )
}
