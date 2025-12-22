import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login/Login.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import PageNotFound from "./Pages/Error/PageNotFound";
import AuthLayout from "./Pages/Auth/AuthLayout";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Mahasiswa from "./Pages/Admin/Mahasiswa/Mahasiswa.jsx";
import RencanaStudi from "./Pages/Admin/RencanaStudi/RencanaStudi.jsx";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail/MahasiswaDetail.jsx";

import ProtectedRoute from "./Pages/Admin/Components/ProtectedRoute.jsx";
import { AuthProvider } from "./Pages/Auth/Context/AuthContext.jsx";

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "mahasiswa",
        children: [
          { index: true, element: <Mahasiswa /> },
          { path: ":id", element: <MahasiswaDetail /> },
        ],
      },
      {
        path: "rencana-studi",
        element: <RencanaStudi/>
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

// Render App
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

