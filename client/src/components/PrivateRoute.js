import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../auth/auth';

const PrivateRoute = ({ element }) => {
  const { authenticated, checkAuthentication } = useAuth();

  // Function for initial check when the component mounts
  const handleInitialCheck = async () => {
    await checkAuthentication();
  };

  console.log('PrivateRoute - authenticated:', authenticated);

  // Check authentication when the component mounts
  /*useEffect(() => {
    handleInitialCheck();
  }, []); // Empty dependency array for initial mount

  // Check authentication when the authenticated state changes
  /*useEffect(() => {
  }, [authenticated]);*/

  return authenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;