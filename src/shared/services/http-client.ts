import axios from 'axios';
import { store } from '../store/store';
import { clearAuth, setTokens } from '@/app/features/auth/store/auth-slice';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  const tenantId = state.auth.activeTenant?.id;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId;
  }
  
  return config;
});

// Auto-refresh logic
httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = store.getState().auth.refreshToken;
      if (!refreshToken) {
        store.dispatch(clearAuth());
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        store.dispatch(setTokens({
          accessToken: data.access_token,
          refreshToken,
          isAuthenticated: true,
        }));

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return httpClient(originalRequest); // Retry original request
      } catch (refreshErr) {
        store.dispatch(clearAuth());
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);