import { AppError } from "@/shared/utils"
import { LucideAlertCircle } from "lucide-react"
import { Navigate, useLocation, useRouteError } from "react-router"

export const ErrorBoundary = () => {
  const error = useRouteError()
  const location = useLocation()

  let statusCode: number | null = null

  if (error instanceof AppError) {
    if (error.statusCode === 401) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    statusCode = error.statusCode ?? null
  }

  if (process.env.NODE_ENV === "development") {
    console.error(error)
  }

  let title: string
  let message: string

  switch (statusCode) {
    case 400:
      title = "Solicitud incorrecta"
      message = "Parece que algo fue mal con tu solicitud."
      break
    case 404:
      title = "Página no encontrada"
      message = "La página que buscas no existe o ha sido movida."
      break
    case 500:
      title = "Error del servidor"
      message = "Ocurrió un error inesperado en el servidor."
      break
    default:
      title = "Algo salió mal"
      message = "No pudimos procesar tu solicitud. Intenta más tarde."
      break
  }

  return (
    <div className="flex size-full min-h-[calc(100vh-57px-24px)] items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <div className="text-muted-foreground flex flex-col items-center gap-y-3">
          <LucideAlertCircle className="w-8 h-8" />
          <div className="flex flex-col items-center justify-center gap-y-1 text-center">
            <strong className="text-base">{title}</strong>
            <p className="text-sm text-muted">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
