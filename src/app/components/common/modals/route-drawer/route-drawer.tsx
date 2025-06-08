import { type PropsWithChildren, useEffect, useState } from 'react'
import { type Path, useNavigate } from 'react-router'
import { useStateAwareTo } from '../hooks/use-state-aware-to'
import { RouteModalProvider } from '../route-modal-provider/route-provider'
import { StackedModalProvider } from '../stacked-modal-provider'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/app/components/ui/drawer'
import clsx from 'clsx'
import { RouteModalForm } from '../route-modal-form'

/**
 * Props del componente RouteDrawer.
 * 
 * @typedef RouteDrawerProps
 * @property {string | Partial<Path>} [prev] - Ruta previa a la que se debe volver al cerrar el Drawer. Por defecto, `".."`.
 */
type RouteDrawerProps = PropsWithChildren<{
  prev?: string | Partial<Path>
}>

/**
 * RouteDrawer
 *
 * Componente que renderiza un modal lateral (`Drawer`) basado en rutas.
 * Se utiliza típicamente para abrir formularios sobre la ruta actual, sin perder el contexto (paginación, filtros, etc.).
 *
 * Internamente:
 * - Usa `useStateAwareTo` para recuperar la ruta previa (incluyendo search params si existen).
 * - Encapsula `RouteModalProvider` para exponer el contexto del modal.
 * - Usa `StackedModalProvider` para manejar casos donde hay múltiples modales apilados.
 *
 * @example
 * <RouteDrawer prev="/productos">
 *   <ProductForm />
 * </RouteDrawer>
 */
const Root = ({ prev = '..', children }: RouteDrawerProps) => {
  const navigate = useNavigate()

  // Controla el estado de apertura del drawer principal
  const [open, setOpen] = useState(false)

  // Indica si hay modales secundarios (stacked) abiertos
  const [stackedModalOpen, onStackedModalOpen] = useState(false)

  // Determina la ruta a la que se debe volver al cerrar el modal
  const to = useStateAwareTo(prev)

  /**
   * Abrimos el drawer apenas el componente se monta.
   * Esto asegura que se ejecute la animación de entrada.
   */
  useEffect(() => {
    setOpen(true)
    return () => {
      setOpen(false)
      onStackedModalOpen(false)
    }
  }, [])

  /**
   * Maneja los cambios de apertura del drawer.
   * Si se cierra, navega de vuelta a `to`.
   */
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      document.body.style.pointerEvents = 'auto'
      navigate(to, { replace: true })
      return
    }
    setOpen(open)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <RouteModalProvider prev={to}>
        <StackedModalProvider onOpenChange={onStackedModalOpen}>
          <DrawerContent
            aria-describedby={undefined}
            className={clsx({
              '!bg-ui-bg-disabled !inset-y-5 !right-5': stackedModalOpen,
            })}
          >
            {children}
          </DrawerContent>
        </StackedModalProvider>
      </RouteModalProvider>
    </Drawer>
  )
}

// Exponemos subcomponentes del Drawer como propiedades estáticas para conveniencia
const Header = DrawerHeader
const Title = DrawerTitle
const Description = DrawerDescription
const Body = DrawerContent
const Footer = DrawerFooter
const Close = DrawerClose
const Form = RouteModalForm

/**
 * Componente exportado que encapsula toda la lógica de un Drawer enroutable.
 * Puedes usar:
 * - <RouteDrawer.Header />
 * - <RouteDrawer.Title />
 * - <RouteDrawer.Body />
 * - etc.
 */
export const RouteDrawer = Object.assign(Root, {
  Header,
  Title,
  Body,
  Description,
  Footer,
  Close,
  Form
})
