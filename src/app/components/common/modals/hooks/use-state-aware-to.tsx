import { useMemo } from "react"
import { type Path, useLocation } from "react-router"

/**
 * Hook: useStateAwareTo
 *
 * Este hook retorna una ruta (`path`) "consciente del estado",
 * es decir, considera si hay parámetros de búsqueda (`search params`)
 * previamente almacenados en el estado de navegación.
 *
 * Es útil cuando un modal se abre desde una ruta con filtros,
 * y al cerrarlo se desea volver exactamente a la misma vista con sus filtros (ej. paginación, búsqueda, etc.).
 *
 * @param {string | Partial<Path>} prev - La ruta anterior a la que se debe volver al cerrar el modal.
 * @returns {string | Partial<Path>} La ruta de retorno, incluyendo `search params` si existen en `location.state`.
 *
 * @example
 * const to = useStateAwareTo("/products")
 * navigate(to, { replace: true })
 */
export const useStateAwareTo = (prev: string | Partial<Path>) => {
  const location = useLocation()

  const to = useMemo(() => {
    // Verificamos si el estado contiene parámetros restaurables
    const params = location.state?.restore_params

    // Si no hay parámetros, devolvemos la ruta anterior tal cual
    if (!params) {
      return prev
    }

    // Si existen, construimos una nueva ruta concatenando los parámetros
    return `${prev}?${params.toString()}`
  }, [location.state, prev]) 

  return to
}
