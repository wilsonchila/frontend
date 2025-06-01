import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Clientes from './components/Clientes/Clientes';
import Proyectos from './components/Proyectos/Proyectos';
import Cuadrillas from './components/Cuadrillas/Cuadrillas';
import Personal from './components/Personal/Personal';
import Roles from './components/Roles/Roles';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/clientes" />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="cuadrillas" element={<Cuadrillas />} />
          <Route path="personal" element={<Personal />} />
          <Route path="roles" element={<Roles />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;