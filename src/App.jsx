// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AutheContext";
import { SearchProvider } from "./context/SearchContext"; // ← Importa esto
import Header from "./components/Header";
import Carts from "./components/carts";
import Sidebar from "./components/sidebar";
import Authe from "./pages/authe";
import Settings from "./pages/settings";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function AppRoutes() {
  const { user, loading } = useAuth();

  // Mientras carga la sesión
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Cargando...</p>
        </div>                                                                                                                                                                                                                                        
      </div>
    );
  }

  // Si NO hay usuario autenticado, solo mostrar login
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Authe />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Si HAY usuario autenticado, mostrar la app completa
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Carts />} />
              <Route path="/home" element={<Home />} />
              <Route path="/carts" element={<Carts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>  {/* ← Agrega esto */}
        <AppRoutes />
      </SearchProvider>  {/* ← Cierra aquí */}
    </AuthProvider>
  );
}