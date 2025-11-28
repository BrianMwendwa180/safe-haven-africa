import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const RequireAuth: React.FC<{ children: React.ReactElement | null }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default RequireAuth;
