import { type PropsWithChildren, useEffect, useState } from "react"
import { type Path, useNavigate } from "react-router"
import { useStateAwareTo } from "../hooks/use-state-aware-to"
import { RouteModalProvider } from "../route-modal-provider"
import { StackedModalProvider } from "../stacked-modal-provider"
import { useRouteModal } from "../route-modal-provider/use-route-modal"
import { FocusModal } from "@/app/components/molecules/modal/focus-modal"
import { cn } from "@/shared/utils"
import { RouteModalForm } from "../route-modal-form"

type RouteFocusModalProps = PropsWithChildren<{
  /** Ruta previa a la que se volverá al cerrar el modal */
  prev?: string | Partial<Path>
}>

/**
 * RouteFocusModal
 *
 * Componente que representa un modal enfocado (`FocusModal`) asociado a una ruta.
 * Se usa comúnmente para crear o editar recursos complejos en pantalla completa o modales grandes.
 *
 * Características:
 * - Al montarse, abre el modal automáticamente.
 * - Al cerrarse, navega a la ruta anterior (respetando los parámetros previos si existen).
 * - Permite controlar el cierre por Escape con `useRouteModal`.
 *
 * @example
 * <RouteFocusModal prev="/productos">
 *   <FormularioProducto />
 * </RouteFocusModal>
 */
const Root = ({ prev = "..", children }: RouteFocusModalProps) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [stackedModalOpen, onStackedModalOpen] = useState(false)

  const to = useStateAwareTo(prev)

  /**
   * Abrimos el modal al montarlo para activar la animación de entrada
   */
  useEffect(() => {
    setOpen(true)
    return () => {
      setOpen(false)
      onStackedModalOpen(false)
    }
  }, [])

  /**
   * Cuando el modal cambia de estado (cerrado -> abierto o viceversa)
   */
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      document.body.style.pointerEvents = "auto"
      navigate(to, { replace: true })
      return
    }
    setOpen(open)
  }

  return (
    <FocusModal open={open} onOpenChange={handleOpenChange}>
      <RouteModalProvider prev={to}>
        <StackedModalProvider onOpenChange={onStackedModalOpen}>
          <Content stackedModalOpen={stackedModalOpen}>{children}</Content>
        </StackedModalProvider>
      </RouteModalProvider>
    </FocusModal>
  )
}

type ContentProps = PropsWithChildren<{
  stackedModalOpen: boolean
}>

/**
 * Content del FocusModal que reacciona a configuraciones internas
 * como el bloqueo del cierre por Escape.
 */
const Content = ({ stackedModalOpen, children }: ContentProps) => {
  const { __internal } = useRouteModal()
  const shouldPreventClose = !__internal.closeOnEscape

  return (
    <FocusModal.Content
      onEscapeKeyDown={
        shouldPreventClose
          ? (e: KeyboardEvent) => {
              e.preventDefault()
            }
          : undefined
      }
      className={cn({
        "!bg-ui-bg-disabled !inset-x-5 !inset-y-3": stackedModalOpen,
      })}
    >
      {children}
    </FocusModal.Content>
  )
}

// Reexportamos subcomponentes del modal como propiedades del componente principal
const Header = FocusModal.Header
const Title = FocusModal.Title
const Description = FocusModal.Description
const Footer = FocusModal.Footer
const Body = FocusModal.Body
const Form = RouteModalForm


export const RouteFocusModal = Object.assign(Root, {
  Header,
  Title,
  Body,
  Description,
  Footer,
  Form
})
