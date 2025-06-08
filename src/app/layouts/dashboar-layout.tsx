import { AppSidebar, SidebarInset, SidebarProvider, SidebarTrigger } from '@/app/components/common';
import GradientLayout from './gradient-layout';
import {
  Separator,
} from '@/app/components/ui';
import PrivateRoute from '@/app/components/common/private-route';
import { Outlet } from 'react-router';
import { NavBreadcrumbs } from '../components/molecules/breadcrumbs/nav-breadcrumbs';

/**
 * `DashboardLayout` es un layout de alto nivel para pantallas internas de la aplicación,
 * que incluye:
 *
 * - Fondo visual mediante `GradientLayout`.
 * - Sidebar lateral con contexto de apertura/cierre.
 * - Encabezado con breadcrumbs y botón para controlar la visibilidad del sidebar.
 */
const DashboarLayout = () => {
  return (
    <PrivateRoute>
      <GradientLayout>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 bg-background/25 backdrop-blur-3xl">
            <header className="flex flex-wrap gap-3 py-4 shrink-0 items-center transition-all ease-linear border-b">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="-ms-1" />
                <div className="max-lg:hidden lg:contents">
                  <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
                  <NavBreadcrumbs />
                </div>
              </div>
              {/* Right side */}
            </header>
            <section className="py-4">
              <Outlet />
            </section>
          </SidebarInset>
        </SidebarProvider>
      </GradientLayout>
    </PrivateRoute>
  );
};

export default DashboarLayout;
