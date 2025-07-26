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

// Register a new vendor
export const registerVendor = async (userData) => {
    try {
        const response = await api.post('/users/register/vendor', userData);
        if (response.data && response.data.success) {
            setUserData({
                user: response.data.user,
                token: response.data.token
            });
        }
        return response.data;
    } catch (error) {
        console.error('Register vendor error:', error);
        throw error.response?.data || { message: 'An error occurred during registration' };
    }
};

// Register a new supplier
export const registerSupplier = async (userData) => {
    try {
        const response = await api.post('/users/register/supplier', userData);
        if (response.data && response.data.success) {
            setUserData({
                user: response.data.user,
                token: response.data.token
            });
        }
        return response.data;
    } catch (error) {
        console.error('Register supplier error:', error);
        throw error.response?.data || { message: 'An error occurred during registration' };
    }
};

// Login user (regular users and admins)
export const login = async (email, password) => {
    try {
        console.log('Attempting login for:', email);
        const response = await api.post('/users/login', { email, password });

        console.log('Login response:', response.data);

        if (response.data && response.data.success) {
            setUserData({
                user: response.data.user,
                token: response.data.token
            });
            return response.data;
        } else {
            throw { message: 'Invalid response format from server' };
        }
    } catch (error) {
        console.error('Login error:', error);

        if (error.response?.data?.status === 'pending') {
            throw { message: 'Your account is pending approval. Please contact support.' };
        } else if (error.response?.data?.status === 'rejected') {
            const reason = error.response.data.reason ? ` Reason: ${error.response.data.reason}` : '';
            throw { message: `Your account has been rejected.${reason} Please contact support.` };
        } else if (error.response?.data?.status === 'suspended') {
            throw { message: 'Your account has been suspended. Please contact support.' };
        } else {
            const errorMsg = error.response?.data?.message || 'Invalid credentials. Please check your email and password.';
            throw { message: errorMsg };
        }
    }
};

// Login admin user (same as regular login but with specific handling)
export const loginAdmin = async (email, password) => {
    try {
        console.log('Attempting admin login for:', email);
        const loginResult = await login(email, password);

        // Check if the logged-in user is actually an admin
        if (loginResult.user && loginResult.user.role === 'admin') {
            console.log('Admin login successful');
            return loginResult;
        } else {
            // Clear the stored data if user is not admin
            logout();
            throw { message: 'Unauthorized. Admin access required.' };
        }
    } catch (error) {
        console.error('Admin login error:', error);
        throw error;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
    const userData = getUserData();
    return userData ? userData.user : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
    const userData = getUserData();
    return userData && userData.token && userData.user;
};

// Get auth token
export const getToken = () => {
    const userData = getUserData();
    return userData ? userData.token : null;
};

// Check if current user is admin
export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

// Check if current user is supplier
export const isSupplier = () => {
    const user = getCurrentUser();
    return user && user.role === 'supplier';
};

// Check if current user is vendor
export const isVendor = () => {
    const user = getCurrentUser();
    return user && user.role === 'vendor';
};

// Get user role
export const getUserRole = () => {
    const user = getCurrentUser();
    return user ? user.role : null;
};

// Refresh user data from server
export const refreshUser = async () => {
    try {
        const response = await api.get('/users/profile');
        if (response.data) {
            const userData = getUserData();
            if (userData) {
                setUserData({
                    user: response.data,
                    token: userData.token
                });
            }
            return response.data;
        }
    } catch (error) {
        console.error('Refresh user error:', error);
        // If token is invalid, logout
        if (error.response?.status === 401) {
            logout();
        }
        throw error;
    }
};

// Get user status
export const getUserStatus = () => {
    const user = getCurrentUser();
    return user ? user.status : null;
};
