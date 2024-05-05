import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useAuth();
  return (
    <Route {...rest} render={({ location }) => 
      auth ? (children) : (<Navigate to="/login" state={{ from: location }} />)
    } />
  );
};

export default PrivateRoute;
