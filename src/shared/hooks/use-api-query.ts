import { useQuery, type UseQueryOptions, type QueryKey } from '@tanstack/react-query';
import { httpClient } from '@/shared/services/http-client';
import { handleApiError } from '@/shared/utils/error-handler';

interface UseApiQueryOptions<TData> extends Omit<UseQueryOptions<TData>, 'queryFn' | 'queryKey'> {
  url: string;
  queryKey?: QueryKey;
  params?: Record<string, string | number | boolean>;
  enabled?: boolean;
}

/**
 * Hook genérico para peticiones GET usando Axios + React Query.
 * 
 * @example
 * const { data, isLoading } = useApiQuery({ url: '/user/user-preferences' });
 */
export function useApiQuery<TData = unknown>({
  url,
  queryKey,
  params,
  enabled = true,
  ...options
}: UseApiQueryOptions<TData>) {
  return useQuery<TData>({
    queryKey: queryKey ?? [url, params],
    enabled,
    queryFn: async () => {
      try {
        const response = await httpClient.get<TData>(url, {
          params,
        });
        return response.data;
      } catch (err) {
        throw handleApiError(err);
      }
    },
    ...options,
  });
}