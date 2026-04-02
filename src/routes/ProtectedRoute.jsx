import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("userToken");
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (adminOnly && !decoded.isAdmin) return <Navigate to="/login" />;
  } catch (err) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;