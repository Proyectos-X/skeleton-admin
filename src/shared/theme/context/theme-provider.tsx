import {type Theme, type ThemeProviderProps, ThemeProviderContext} from "@/shared/theme"
import { useEffect, useState } from "react"

/**
 * `ThemeProvider` es un proveedor de contexto que gestiona el tema visual de la aplicación
 * (claro, oscuro o automático según el sistema). 
 * Almacena la preferencia del usuario en `localStorage` y aplica la clase correspondiente al `document.documentElement`.
 *
 * @param {ThemeProviderProps} props - Propiedades del proveedor de tema.
 * @param {React.ReactNode} props.children - Elementos hijos que estarán bajo el contexto de tema.
 * @param {Theme} [props.defaultTheme="system"] - Tema por defecto si no se encuentra en el almacenamiento.
 * @param {string} [props.storageKey="vite-ui-theme"] - Clave usada en `localStorage` para guardar el tema.
 * @returns {JSX.Element} El proveedor de contexto de tema envolviendo a los hijos.
 * @todo
 * Este proveedor actualiza la clase del `html` root con `"light"` o `"dark"`, facilitando la integración con TailwindCSS.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
