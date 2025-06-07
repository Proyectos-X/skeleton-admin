import { createBrowserRouter, Navigate } from 'react-router';
import DashboarLayout from '../layouts/dashboar-layout';
import NotFound from '../pages/not-found';
import LoginPage from '@/app/features/auth/page/login-page';
import ProductPage from '../features/products/page/product-page';
import { ProductCreate } from '../features/products/page/product-create';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboarLayout />,
    children: [
      {
        path: '/products',
        element: <ProductPage />,
        children:[
          {
            path: 'create',
            element: <ProductCreate/>
          }
        ]
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
