import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";

function App() {
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin"]} userRole={role}>
              <Admin />
            </RoleGuard>
          </ProtectedRoute>
        } />

        <Route path="/editor" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin", "editor"]} userRole={role}>
              <Editor />
            </RoleGuard>
          </ProtectedRoute>
        } />

        <Route path="/viewer" element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin", "editor", "viewer"]} userRole={role}>
              <Viewer />
            </RoleGuard>
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;