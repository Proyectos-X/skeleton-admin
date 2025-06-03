
import { toast } from 'sonner';
import type { LoginDto, LoginResponse } from '../interfaces/dto';
import { useApiMutation } from '@/shared/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { setTokens } from '../store/auth-slice';
import { useLoadPreferences } from './use-load-preferences';
import { useLoadTenants } from './use-load-tenants';

export function useLogin() {
  const dispatch = useDispatch();

  return useApiMutation<LoginResponse, LoginDto>({
    url: '/auth/login',
    onSuccess: (data) => {
      const { access_token, refresh_token } = data;
      dispatch(setTokens({ accessToken: access_token, refreshToken: refresh_token, isAuthenticated: true }));
      toast.success('Inicio de sesión exitoso');
    },
    onError: (err: unknown) => {
        toast.error('Error cargando datos del usuario');
        console.error(err);
    },
  });
}

export function useInitAuth() {
  const loadPreferences = useLoadPreferences();
  const loadTenants = useLoadTenants();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectUrl = searchParams.get('redirectUrl') ?? '/';
  return async () => {
    await Promise.all([loadPreferences(), loadTenants()]);
    navigate(redirectUrl, { replace: true });
  };
}