import axios from 'axios';

const BASE_URL = 'http://localhost:3001/auth';

export const registerUser = async ( username, password ) => {
    try {
    const response = await axios.post(`${BASE_URL}/register`, {
        username,
        password,
    });
    return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
}

export const verifyToken = async ( token ) => {
    try {
        const response = await axios.post(
        `${BASE_URL}/verify`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};