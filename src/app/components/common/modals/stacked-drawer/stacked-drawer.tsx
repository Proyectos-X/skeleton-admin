import {
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  forwardRef,
  useEffect,
} from "react"
import { useStackedModal } from "../stacked-modal-provider"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer"
import { cn } from "@/shared/utils"

type StackedDrawerProps = PropsWithChildren<{
  /**
   * Identificador único del modal apilado.
   * Este `id` es utilizado por el contexto `StackedModalProvider` para controlar
   * múltiples modales abiertos simultáneamente.
   */
  id: string
}>

/**
 * `StackedDrawer` es un modal apilable que se muestra sobre un modal base.
 * Está pensado para flujos de edición, creación o selección secuencial dentro de un modal padre.
 *
 * Este componente se registra automáticamente en el contexto `StackedModalProvider`
 * para controlar su apertura/cierre individualmente a través del `id`.
 *
 * @param {StackedDrawerProps} props - Props del componente incluyendo el `id` único y `children`.
 * @returns {JSX.Element} Componente modal Drawer controlado por contexto.
 *
 * @example
 * <StackedDrawer id="product-options">
 *   <StackedDrawer.Content>
 *     <StackedDrawer.Header>
 *       <StackedDrawer.Title>Editar opciones</StackedDrawer.Title>
 *     </StackedDrawer.Header>
 *     <StackedDrawer.Body>
 *       <Form />
 *     </StackedDrawer.Body>
 *   </StackedDrawer.Content>
 * </StackedDrawer>
 */
export const Root = ({ id, children }: StackedDrawerProps) => {
  const { register, unregister, getIsOpen, setIsOpen } = useStackedModal()

  useEffect(() => {
    register(id)
    return () => unregister(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer open={getIsOpen(id)} onOpenChange={(open) => setIsOpen(id, open)}>
      {children}
    </Drawer>
  )
}

/**
 * Componente que representa el contenido del modal apilado.
 * Internamente usa `DrawerContent` de ShadCN con soporte para `ref` y `className`.
 */
const Content = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DrawerContent>
>(({ className, ...props }, ref) => {
  return <DrawerContent ref={ref} className={cn(className)} {...props} />
})
Content.displayName = "StackedDrawer.Content"

// Re-export de subcomponentes del Drawer base, tipados y nombrados para claridad
const Close = DrawerClose
const Header = DrawerHeader
const Body = DrawerContent
const Trigger = DrawerTrigger
const Footer = DrawerFooter
const Title = DrawerTitle
const Description = DrawerDescription

export const StackedDrawer = Object.assign(Root, {
  Close,
  Header,
  Body,
  Content,
  Trigger,
  Footer,
  Description,
  Title,
})
