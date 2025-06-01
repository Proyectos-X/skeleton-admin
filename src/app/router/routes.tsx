import { createBrowserRouter, Navigate } from "react-router";
import DashboarLayout from "../layouts/dashboar-layout";
import NotFound from "../pages/not-found";
import LoginPage from "@/features/auth/page/login-page";
import RegisterPage from "@/features/auth/page/register-page";
import CoursePage from "@/features/course/pages/course-page";
import AuthLayout from "@/features/auth/layout/auth-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboarLayout />,
    children: [{ index: true, element: <CoursePage /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
