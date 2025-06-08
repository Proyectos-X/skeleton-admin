import { createBrowserRouter, Navigate } from 'react-router';
import DashboarLayout from '../layouts/dashboar-layout';
import NotFound from '../pages/not-found';
import LoginPage from '../features/auth/login/login-page';
import { ErrorBoundary } from '../components/common/error-boundary';
import ProductPage from '../features/products/product-list/product-page';
import ProductCreate from '../features/products/product-edit/product-create';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboarLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/products',
        errorElement: <ErrorBoundary />,
        handle: {
          breadcrumb: () => "Products",
        },
        children: [
          {
            path: '',
            element: <ProductPage />,
            children: [
              {
                path: 'create',
                element: <ProductCreate />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <LoginPage />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
