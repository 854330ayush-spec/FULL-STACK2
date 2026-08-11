import React from "react";
import { Navigate } from "react-router-dom";

function RoleGuard({ allowedRoles, userRole, children }) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleGuard;