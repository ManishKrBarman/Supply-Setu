import axios from 'axios';

// Get token from localStorage
const getAuthToken = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
};

// Create axios instance with custom config
const api = axios.create({
    baseURL: 'http://localhost:3005/api',
    headers: {
        'Content-Type': 'application/json',
    },
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
