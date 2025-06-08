import { authReducer } from '@/app/features/auth/common/store/auth-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // tenant: tenantReducer,
});
