import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStateContext } from "../../Auth/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = localStorage.getItem("user");
  const { user } = useAuthStateContext();

// Belum Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Sudah Login
  return children;
};

export default ProtectedRoute;