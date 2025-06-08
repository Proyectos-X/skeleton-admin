import { Form, useZodForm } from '@/shared/form';

import { MailIcon } from 'lucide-react';
import { AdvancedInputField, PasswordField } from '@/app/components/molecules';
import { Button } from '@/app/components/ui';
import { loginSchema, type LoginFormValues } from '../common/lib/auth-validation';
import { useLogin } from '../common/hooks/use-login';

export function LoginForm() {
  const form = useZodForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    login.mutate(data);
  };

  return (
    <Form<LoginFormValues> methods={form} onSubmit={onSubmit} className="max-w-md space-y-6">
      <AdvancedInputField
        name="email"
        label="Correo electrónico"
        placeholder="ejemplo@gmail.com"
        iconEnd={<MailIcon size={16} />}
      />
      <PasswordField name="password" />
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
    </Form>
  );
}
