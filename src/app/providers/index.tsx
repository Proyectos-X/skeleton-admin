import React from 'react';
import ReduxProvider from './redux-provider';
import { TanstackProvider } from './query-client-provider';
import { ThemeProvider } from '../../shared/theme/context/theme-provider';
import { Toaster } from '@/shared/components/ui';

/**
 * `AppProvider` es un proveedor global de contexto que encapsula múltiples contextos esenciales para la aplicación,
 * incluyendo:
 *
 * - `ReduxProvider`: Provee el estado global de Redux.
 * - `TanstackProvider`: Provee la configuración del cliente de TanStack Query (React Query).
 * - `ThemeProvider`: Maneja el tema de la interfaz (oscuro/claro/sistema).
 * - `Toaster`: Componente visual para notificaciones (toast).
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider>
    <TanstackProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
        <Toaster />
      </ThemeProvider>
    </TanstackProvider>
  </ReduxProvider>
);
