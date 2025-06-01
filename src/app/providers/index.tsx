import React from 'react';
import ReduxProvider from './redux-provider';
import { TanstackProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/shared/components/ui';

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
