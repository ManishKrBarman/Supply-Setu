import axios from 'axios';

// Get token from localStorage
const getAuthToken = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const parsed = JSON.parse(userData);
            return parsed.token || null;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            localStorage.removeItem('user');
            return null;
        }
    }
    return null;
};

// Create axios instance with custom config
const api = axios.create({
    baseURL: 'http://localhost:3005/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // Add timeout to catch connection issues faster
    timeout: 10000
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 (Unauthorized) errors
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            // Optionally redirect to login page
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
