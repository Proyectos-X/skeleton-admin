
import { toast } from 'sonner';
import type { LoginDto, LoginResponse } from '../interfaces/dto';
import { useApiMutation } from '@/shared/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { setTokens } from '../store/auth-slice';
import type { AppDispatch } from '@/shared/store';
import { loadPreferences, loadTenants } from '../store/auth-thunk';

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectUrl = searchParams.get('redirectUrl') ?? '/';

  return useApiMutation<LoginResponse, LoginDto>({
    url: '/auth/login',
    onSuccess: async (data) => {
      const { access_token, refresh_token } = data;
      dispatch(setTokens({ accessToken: access_token, refreshToken: refresh_token, isAuthenticated: true }));
      await dispatch(loadTenants()).unwrap();
      await dispatch(loadPreferences()).unwrap();
      navigate(redirectUrl)
      toast.success('Inicio de sesión exitoso');
    },
    onError: (err: unknown) => {
      toast.error('Error cargando datos del usuario');
      console.error(err);
    },
  });
}
