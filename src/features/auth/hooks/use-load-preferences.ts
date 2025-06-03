import { httpClient } from '@/shared/services';
import { useDispatch } from 'react-redux';
import { setPreferences } from '../store/auth-slice';
import { BaseError, handleApiError } from '@/shared/utils';
import { toast } from 'sonner';

export async function fetchPreferences() {
  try {
    const res = await httpClient.get('/user/user-preferences');
    return res.data;
  } catch (error) {
    throw handleApiError(error); 
  }
}

export function useLoadPreferences() {
  const dispatch = useDispatch();

  return async () => {
    try {
      const prefs = await fetchPreferences();
      dispatch(setPreferences(prefs));
    } catch (error: unknown) {
      const message =
        error instanceof BaseError ? error.message : 'Error cargando preferencias';
      toast.error(message);
    }
  };
}
