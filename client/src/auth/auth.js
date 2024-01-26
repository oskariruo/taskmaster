import { useState, useEffect } from "react";
import * as authApi from './api';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const checkAuthentication = async () => {
        try {
          const token = localStorage.getItem('token');
      
          if (token) {
            const response = await authApi.verifyToken(token);
      
            console.log('Server Response:', response);
      
            if (response.message === 'Token verified') {
              console.log('User authenticated');
              setAuthenticated(true);
            } else {
              console.log('User not authenticated');
              setAuthenticated(false);
              localStorage.removeItem('token');
            }
          }
        } catch (error) {
          console.log('Error checking authentication:', error);
        }
      };

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('token');
    }

    const handleLogin = () => {
        setAuthenticated(true);
    }

useEffect(() => {
  console.log('useAuth - useEffect triggered');
    checkAuthentication();
}, []);

return {
    authenticated,
    checkAuthentication,
    handleLogout,
    handleLogin
    }
}

export default useAuth;
