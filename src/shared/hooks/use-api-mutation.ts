import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { httpClient } from "../services/http-client";
import { handleApiError } from "../utils/error-handler";


type HttpMethod = 'post' | 'put' | 'patch';

interface UseApiMutationOptions<TData, TPayload> extends UseMutationOptions<TData, unknown, TPayload> {
  url: string;
  method?: HttpMethod;
  config?: AxiosRequestConfig;
}

/**
 * Hook genérico para mutaciones HTTP usando Axios + React Query.
 *
 * @param url Endpoint del API.
 * @param method Método HTTP ('post', 'put', 'patch').
 * @param config Configuración adicional de Axios.
 */
export function useApiMutation<TData = unknown, TPayload = unknown>({
  url,
  method = 'post',
  config,
  ...options
}: UseApiMutationOptions<TData, TPayload>) {
  return useMutation<TData, unknown, TPayload>({
    mutationFn: async (payload: TPayload) => {
      try {
        const res = await httpClient.request<TData>({
          url,
          method,
          data: payload,
          ...config,
        });
        return res.data;
      } catch (err) {
       throw handleApiError(err);
      }
    },
    ...options,
  });
}