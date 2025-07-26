import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getUserRole, getUserStatus } from '../api/authService';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();
  const userRole = getUserRole();
  const userStatus = getUserStatus();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Check if user account is active or approved
  if (userStatus !== 'active' && userStatus !== 'approved' && userRole !== 'admin') {
    // Redirect to pending approval page
    return <Navigate to="/pending-approval" replace />;
  }
  
  // Check if specific roles are required and user has permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;