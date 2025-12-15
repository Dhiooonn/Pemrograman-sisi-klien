import { StrictMode } from 'react'
import './App.css'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Pages/Home'
import Login from './Pages/Auth/Login/Login.jsx'
import Dashboard from './Pages/Admin/Dashboard/Dashboard'
import PageNotFound from './Pages/Error/PageNotFound'
import AuthLayout from './Pages/Auth/AuthLayout'
import AdminLayout from './Pages/Admin/AdminLayout'
import Mahasiswa from './Pages/Admin/Mahasiswa/Mahasiswa.jsx'
import MahasiswaDetail from './Pages/Admin/MahasiswaDetail/MahasiswaDetail.jsx'
import ProtectedRoute from './Pages/Admin/Components/ProtectedRoute.jsx';
import { AuthProvider } from './Pages/Auth/Context/AuthContext.jsx';

const router =  createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      // {
      //   path: "mahasiswa",
      //   element: <Mahasiswa />
      // }
      {
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />
          },
          {
            path: ":id",
            element: <MahasiswaDetail />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </AuthProvider>,
)
