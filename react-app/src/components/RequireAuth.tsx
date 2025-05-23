import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Завантаження...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
