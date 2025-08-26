import React from 'react';
import { useAuth } from '../../helpers/AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Redirect to admin login if not authenticated as admin
    window.location.href = '/admin/login';
    return null;
  }

  return children;
};

export default AdminProtectedRoute;
