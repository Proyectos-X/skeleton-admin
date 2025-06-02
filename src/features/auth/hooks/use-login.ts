
import { toast } from 'sonner';
import type { LoginDto, LoginResponse } from '../interfaces/dto';
import { useApiMutation } from '@/shared/hooks';

export function useLogin() {
  return useApiMutation<LoginResponse, LoginDto>({
    url: '/auth/login',
    onSuccess: (data) => {
      console.log(data);
      toast.success('Inicio de sesión exitoso');
      // guardar tokens, redireccionar, etc.
    },
    onError: (err: unknown) => {
      let message = 'Error al iniciar sesión';

      if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    },
  });
}