import { useAuthStatus } from '@/features/auth/hooks/use-auth-status';
import type { RootState } from '@/shared/store';
import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: 'ADMIN' | 'USER' | 'MANTAINER';
}

export default function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { roles } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useAuthStatus();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth/login?redirectUrl=${redirectUrl}`} replace />;
  }

  if (requiredRole && roles && !roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
