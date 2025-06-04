import { httpClient } from "@/shared/services";
import type { RootState } from "@/shared/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setActiveTenant, setPreferences, setTenants } from "./auth-slice";
import { toast } from "sonner";
import type { Tenant } from "../interfaces/tenant";
import { AppError } from "@/shared/utils";

export const loadPreferences = createAsyncThunk<void, void, { state: RootState }>(
    'auth/loadPreferences',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await httpClient.get('/user/user-preferences');
            dispatch(setPreferences(response.data));
        } catch (error: unknown) {
            toast.error(
                'Error cargando preferencias'
            );
            return rejectWithValue(error);
        }
    }
);

export const loadTenants = createAsyncThunk<void, void, { state: RootState }>(
  'auth/loadTenants',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await httpClient.get<{ content: Tenant[] }>('/tenacy/my-tenants');
      const tenants = res.data.content;

      if (!tenants.length) {
        throw new AppError({ message: 'No tienes inquilinos disponibles' });
      }

      const currentTenants = getState().auth.tenants;
      const oldIds = currentTenants.map(t => t.id).join(',');
      const newIds = tenants.map(t => t.id).join(',');

      if (oldIds !== newIds) {
        dispatch(setTenants(tenants));
        dispatch(setActiveTenant(tenants[0]));
      }

    } catch (error: unknown) {
      toast.error('Error cargando inquilinos');
      return rejectWithValue(error);
    }
  }
);