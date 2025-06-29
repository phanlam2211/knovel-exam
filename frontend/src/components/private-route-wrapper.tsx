import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGetCurrentUser } from '../hooks/use-get-current-user';

interface PrivateRouteWrapperProps {
  allowedRoles?: string[];
}

export const PrivateRouteWrapper = ({ allowedRoles }: PrivateRouteWrapperProps) => {
  const { data, loading } = useGetCurrentUser();

  if (loading) return null;

  if (!data) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(data.role?.name)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}; 