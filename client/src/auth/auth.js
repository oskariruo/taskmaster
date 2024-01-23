import { useState, useEffect } from "react";
import * as authApi from './api';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const checkAuthentication = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await authApi.verifyToken(token);

                if (response.authenticated) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    localStorage.removeItem('token');
                }
            }
        } catch (error) {
            console.log('Error checking authentication:', error);
        }
    }

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('token');
    }


useEffect(() => {
    checkAuthentication();
}, []);

return {
    authenticated,
    checkAuthentication,
    handleLogout,
    }
}

export default useAuth;
