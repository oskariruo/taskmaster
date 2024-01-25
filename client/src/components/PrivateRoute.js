// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../auth/auth';

const PrivateRoute = ({ element }) => {
  const { authenticated, checkAuthentication } = useAuth();

  // Check authentication when the component mounts
  React.useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  console.log(authenticated, '!!!!!')
  return authenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;