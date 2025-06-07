import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui';
import { LoginForm } from '../components/login-form';
import GradientLayout from '@/app/layouts/gradient-layout';

const LoginPage = () => {
  return (
    <GradientLayout>
      <div className="flex items-center justify-center min-h-screen w-full">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </GradientLayout>
  );
};

export default LoginPage;
