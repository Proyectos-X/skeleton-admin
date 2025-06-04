import GradientLayout from '@/app/layouts/gradient-layout';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <GradientLayout>
      <Outlet />
    </GradientLayout>
  );
};

export default AuthLayout;
