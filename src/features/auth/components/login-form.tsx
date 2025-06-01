import { Form, useZodForm } from '@/shared/form';
import { loginSchema, type LoginFormValues } from '../lib/auth-validation';

import { MailIcon } from 'lucide-react';
import { AdvancedInputField, PasswordField } from '@/shared/components/molecules';
import { Button } from '@/shared/components/ui';

export function LoginForm() {
  const form = useZodForm(loginSchema, {
    defaultValues: {
      email: '',
      password: 'gdfgdfgfd',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log('Datos del formulario:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
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
      <Button type="submit" className="w-full">
        Iniciar sesión
      </Button>
    </Form>
  );
}