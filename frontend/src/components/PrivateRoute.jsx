import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

export default PrivateRoute;