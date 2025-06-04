import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './sidebar';
import { ArrowDown, CheckLineIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from '@/shared/store';
import { setActiveTenant } from '@/app/features/auth/store/auth-slice';
import type { Tenant } from '@/app/features/auth/interfaces/tenant';

/**
 * `StoreSwitcher` es un componente interactivo que permite al usuario seleccionar una tienda (store)
 * desde una lista desplegable, utilizando un menú basado en Radix UI.
 * Este componente es ideal para interfaces de administración multitienda, permitiendo conmutar
 * entre tiendas activas con un diseño compacto y accesible.
 * @warning Este componente aun esta en desarrollo.
 */
export function StoreSwitcher() {
  const dispatch = useDispatch();
  const tenants: Tenant[] = useSelector((state: RootState) => state.auth.tenants);
  const activeTenant = useSelector((state: RootState) => state.auth.activeTenant);

  if (!tenants.length) return null;

  const handleSelect = (tenantId: string) => {
    const selected = tenants.find((t) => t.id === tenantId);
    if (selected) {
      dispatch(setActiveTenant(selected));
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3 [&>svg]:size-auto"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTenant?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-medium">
                  {activeTenant?.name ?? 'Selecciona una tienda'}
                </span>
              </div>
              <ArrowDown
                className="ms-auto text-muted-foreground/60"
                size={20}
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="uppercase text-muted-foreground/60 text-xs">
              Tiendas
            </DropdownMenuLabel>
            {tenants.map((tenant) => (
              <DropdownMenuItem
                key={tenant.id}
                onClick={() => handleSelect(tenant.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground font-semibold">
                  {tenant.name.charAt(0).toUpperCase()}
                </div>
                {tenant.name}
                {tenant.id === activeTenant?.id && (
                  <DropdownMenuShortcut>Activa</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <CheckLineIcon className="opacity-60" size={16} aria-hidden="true" />
              <div className="font-medium">Agregar tienda</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
