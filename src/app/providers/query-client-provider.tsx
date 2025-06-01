import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/utils/react-query-client';

export const TanstackProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
