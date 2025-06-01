
import { AppSidebar, SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/common';
import GradientLayout from './gradient-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Separator } from '@/shared/components/ui';

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
    <GradientLayout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 bg-background/50 backdrop-blur-3xl">
          <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear border-b">
            {/* Left side */}
            <div className="flex flex-1 items-center gap-2">
              <SidebarTrigger className="-ms-1" />
              <div className="max-lg:hidden lg:contents">
                <Separator
                  orientation="vertical"
                  className="me-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            {/* Right side */}
          </header>
        </SidebarInset>
      </SidebarProvider>
    </GradientLayout>
  );
};

export default DashboarLayout;
