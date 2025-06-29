import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRouteWrapperProps {
  allowedRoles?: string[];
}

export const PrivateRouteWrapper = ({ allowedRoles }: PrivateRouteWrapperProps) => {
  // Get user info from localStorage only
  let user: any = null;
  const localUser = localStorage.getItem('currentUser');
  if (localUser) {
    try {
      user = JSON.parse(localUser);
    } catch {
      // Ignore JSON parse error
    }
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role?.name)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}; 