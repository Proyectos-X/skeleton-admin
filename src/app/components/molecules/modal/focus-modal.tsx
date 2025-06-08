import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog"
import { X } from "lucide-react"
import { cn } from "@/shared/utils"
import { Button } from "../../ui"

/**
 * Props para el componente raíz `FocusModalRoot`, basado en `Dialog`.
 */
type FocusModalRootProps = React.ComponentPropsWithoutRef<typeof Dialog>

/**
 * `FocusModalRoot`
 *
 * Componente raíz del modal, basado en `Dialog` de Radix.
 * Este componente controla el estado abierto/cerrado del modal.
 *
 * @param props - Propiedades heredadas de `Dialog`
 */
const FocusModalRoot = (props: FocusModalRootProps) => {
  return <Dialog {...props} />
}
FocusModalRoot.displayName = "FocusModal"

/**
 * `FocusModalTrigger`
 *
 * Componente que actúa como disparador para abrir el modal.
 * Debe envolver un botón o elemento interactivo.
 */
const FocusModalTrigger = React.forwardRef<
  React.ElementRef<typeof DialogTrigger>,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>((props, ref) => {
  return <DialogTrigger ref={ref} {...props} />
})
FocusModalTrigger.displayName = "FocusModal.Trigger"

/**
 * `FocusModalPortal`
 *
 * Componente que encapsula el portal del modal, permitiendo renderizarlo fuera del DOM principal.
 */
const FocusModalPortal = (props: React.ComponentPropsWithoutRef<typeof DialogPortal>) => {
  return <DialogPortal {...props} />
}
FocusModalPortal.displayName = "FocusModal.Portal"

/**
 * `FocusModalOverlay`
 *
 * Capa oscura detrás del modal, con desenfoque de fondo.
 * Utiliza `DialogOverlay` de Radix.
 *
 * @param className - Clase adicional para estilos personalizados
 */
const FocusModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogOverlay>,
  React.ComponentPropsWithoutRef<typeof DialogOverlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogOverlay
      ref={ref}
      className={cn(
        "bg-black/50 fixed inset-0 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
})
FocusModalOverlay.displayName = "FocusModal.Overlay"

/**
 * `FocusModalContent`
 *
 * Contenedor principal del contenido del modal.
 * Soporta props para personalizar el portal y el overlay.
 *
 * @param overlayProps - Props opcionales para `FocusModalOverlay`
 * @param portalProps - Props opcionales para `FocusModalPortal`
 * @param className - Clases CSS personalizadas
 */
const FocusModalContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent> & {
    overlayProps?: React.ComponentPropsWithoutRef<typeof FocusModalOverlay>
    portalProps?: React.ComponentPropsWithoutRef<typeof FocusModalPortal>
  }
>(({ className, overlayProps, portalProps, ...props }, ref) => {
  return (
    <FocusModalPortal {...portalProps}>
      <FocusModalOverlay {...overlayProps} />
      <DialogContent
        ref={ref}
        className={cn(
          "bg-background  rounded-lg shadow-xl border p-6 animate-in fade-in zoom-in-95",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-0 data-[state=closed]:slide-in-from-bottom-2  duration-200",
          className
        )}
        {...props}
      />
    </FocusModalPortal>
  )
})
FocusModalContent.displayName = "FocusModal.Content"

/**
 * `FocusModalHeader`
 *
 * Cabecera del modal que incluye el botón para cerrarlo con un ícono `X`.
 * También muestra una combinación de teclas de cierre (`esc`).
 */
const FocusModalHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between border-b pb-2 mb-4", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <DialogClose asChild>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
        <kbd className="text-xs text-muted-foreground">esc</kbd>
      </div>
      {children}
    </div>
  )
})
FocusModalHeader.displayName = "FocusModal.Header"

/**
 * `FocusModalFooter`
 *
 * Pie del modal donde usualmente se colocan los botones de acción (Aceptar, Cancelar).
 */
const FocusModalFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex justify-end gap-2 border-t pt-4 mt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
})
FocusModalFooter.displayName = "FocusModal.Footer"

/**
 * `FocusModalTitle`
 *
 * Título accesible del modal.
 */
const FocusModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => {
  return <DialogTitle ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
})
FocusModalTitle.displayName = "FocusModal.Title"

/**
 * `FocusModalDescription`
 *
 * Descripción accesible del propósito del modal.
 */
const FocusModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => {
  return <DialogDescription ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
})
FocusModalDescription.displayName = "FocusModal.Description"

/**
 * `FocusModalBody`
 *
 * Sección principal del contenido del modal. Scrollable si el contenido excede la altura.
 */
const FocusModalBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 overflow-y-auto", className)} {...props} />
})
FocusModalBody.displayName = "FocusModal.Body"

/**
 * `FocusModal` (API compuesta)
 *
 * Componente modal reutilizable basado en Radix + ShadCN, expuesto como un componente compuesto.
 *
 * @example
 * <FocusModal>
 *   <FocusModal.Trigger><Button>Abrir</Button></FocusModal.Trigger>
 *   <FocusModal.Content>
 *     <FocusModal.Header>
 *       <FocusModal.Title>Título</FocusModal.Title>
 *     </FocusModal.Header>
 *     <FocusModal.Body>Contenido</FocusModal.Body>
 *     <FocusModal.Footer>
 *       <Button>Cancelar</Button>
 *       <Button>Guardar</Button>
 *     </FocusModal.Footer>
 *   </FocusModal.Content>
 * </FocusModal>
 */
const FocusModal = Object.assign(FocusModalRoot, {
  Trigger: FocusModalTrigger,
  Content: FocusModalContent,
  Header: FocusModalHeader,
  Body: FocusModalBody,
  Title: FocusModalTitle,
  Description: FocusModalDescription,
  Footer: FocusModalFooter,
})

export { FocusModal }
