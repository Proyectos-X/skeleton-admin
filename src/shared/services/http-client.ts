import axios from 'axios';
import { store } from '../store/store';

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

