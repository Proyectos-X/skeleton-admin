import { authReducer } from '@/features/auth/store/auth-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // tenant: tenantReducer,
});
