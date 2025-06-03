import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Preferences, User } from '../interfaces/user';
import type { Tenant } from '../interfaces/tenant';


export interface AuthState {
  isAuthenticated?: boolean;
  roles?: string[];
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  tenants: Tenant[];
  activeTenant: Tenant | null;
  preferences: Preferences | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  tenants: [],
  activeTenant: null,
  preferences: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string, isAuthenticated: boolean }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
    },
    setTenants(state, action: PayloadAction<Tenant[]>) {
      state.tenants = action.payload;
    },
    setActiveTenant(state, action: PayloadAction<Tenant>) {
      state.activeTenant = action.payload;
    },
    setPreferences(state, action: PayloadAction<Preferences>) {
      state.preferences = action.payload;
    },
    clearAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTokens,
  setUser,
  setTenants,
  setActiveTenant,
  setPreferences,
  clearAuth,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
