import api from './axios';

// Set user data in local storage
const setUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
};

// Get user data from local storage
const getUserData = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Register a new user
export const register = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        if (response.data) {
            setUserData(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration' };
    }
};

// Login user
export const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        if (response.data) {
            setUserData(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during login' };
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
    return getUserData();
};

// Check if user is logged in
export const isLoggedIn = () => {
    return !!getUserData();
};

// Get auth token
export const getToken = () => {
    const user = getUserData();
    return user ? user.token : null;
};
