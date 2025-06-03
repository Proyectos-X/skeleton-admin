import { httpClient } from '@/shared/services';
import { useDispatch } from 'react-redux';
import { setActiveTenant, setTenants } from '../store/auth-slice';
import { AppError, BaseError, handleApiError } from '@/shared/utils';
import { toast } from 'sonner';

export async function fetchTenants() {
  try {
    const res = await httpClient.get('/tenacy/my-tenants');
    return res.data.content;
  } catch (error) {
    throw handleApiError(error);
  }
}

export function useLoadTenants() {
  const dispatch = useDispatch();

  return async () => {
    try {
      const tenants = await fetchTenants();
      if (!tenants?.length) {
        throw new AppError({ message: 'No tienes inquilinos disponibles' });
      }
      dispatch(setTenants(tenants));
      dispatch(setActiveTenant(tenants[0]));
    } catch (error: unknown) {
      const message =
        error instanceof BaseError ? error.message : 'Error cargando inquilinos';
      toast.error(message);
    }
  };
}
