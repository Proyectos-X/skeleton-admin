import {
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  forwardRef,
  useEffect,
} from "react"
import { useStackedModal } from "../stacked-modal-provider"
import { FocusModal } from "@/app/components/molecules/modal/focus-modal"
import { cn } from "@/shared/utils"

type StackedFocusModalProps = PropsWithChildren<{
  /**
   * Identificador único del modal apilado.
   * Sirve para gestionar su estado de apertura/cierre dentro del contexto global de modales.
   */
  id: string

  /**
   * Callback opcional que se ejecuta cuando el modal se abre o se cierra.
   * Útil para ejecutar lógica externa a la apertura del modal.
   */
  onOpenChangeCallback?: (open: boolean) => void
}>

/**
 * `StackedFocusModal` es una variante de modal que se apila sobre otros modales.
 * Permite flujos de interacción anidados donde múltiples formularios o pantallas
 * deben mostrarse en secuencia, sin salir del contexto modal.
 *
 * Internamente se gestiona mediante `StackedModalProvider`, usando el `id` como clave.
 *
 * @example
 * ```tsx
 * <StackedFocusModal id="variant-editor">
 *   <StackedFocusModal.Content>
 *     <StackedFocusModal.Header>
 *       <StackedFocusModal.Title>Editar Variante</StackedFocusModal.Title>
 *     </StackedFocusModal.Header>
 *     <StackedFocusModal.Body>
 *       <VariantForm />
 *     </StackedFocusModal.Body>
 *   </StackedFocusModal.Content>
 * </StackedFocusModal>
 * ```
 */
export const Root = ({
  id,
  onOpenChangeCallback,
  children,
}: StackedFocusModalProps) => {
  const { register, unregister, getIsOpen, setIsOpen } = useStackedModal()

  useEffect(() => {
    register(id)
    return () => unregister(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(id, open)
    onOpenChangeCallback?.(open)
  }

  return (
    <FocusModal open={getIsOpen(id)} onOpenChange={handleOpenChange}>
      {children}
    </FocusModal>
  )
}

/**
 * Componente de cabecera del modal apilado. Contiene título y botón de cerrar.
 */
const Header = FocusModal.Header
Header.displayName = "StackedFocusModal.Header"

/**
 * Cuerpo principal del modal. Ideal para incluir formularios o listas.
 */
const Body = FocusModal.Body
Body.displayName = "StackedFocusModal.Body"

/**
 * Botón o trigger que abre el modal.
 */
const Trigger = FocusModal.Trigger
Trigger.displayName = "StackedFocusModal.Trigger"

/**
 * Pie del modal, generalmente contiene botones de acción.
 */
const Footer = FocusModal.Footer
Footer.displayName = "StackedFocusModal.Footer"

/**
 * Título del modal, visualizado en la parte superior del contenido.
 */
const Title = FocusModal.Title
Title.displayName = "StackedFocusModal.Title"

/**
 * Descripción secundaria del modal.
 */
const Description = FocusModal.Description
Description.displayName = "StackedFocusModal.Description"

/**
 * Contenedor del contenido del modal apilado.
 * Se puede usar directamente para personalizar estilo y comportamiento.
 */
const Content = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof FocusModal.Content>
>(({ className, ...props }, ref) => {
  return (
    <FocusModal.Content
      ref={ref}
      className={cn("!top-6", className)}
      overlayProps={{
        className: "bg-transparent",
      }}
      {...props}
    />
  )
})
Content.displayName = "StackedFocusModal.Content"

/**
 * `StackedFocusModal` es un modal basado en `FocusModal` que permite anidar y
 * gestionar múltiples instancias de manera controlada mediante `StackedModalProvider`.
 */
export const StackedFocusModal = Object.assign(Root, {
  Header,
  Body,
  Content,
  Trigger,
  Footer,
  Description,
  Title,
})
