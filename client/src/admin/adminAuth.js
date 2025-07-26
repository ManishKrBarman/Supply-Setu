import { login, logout, getCurrentUser, isAdmin } from '../api/authService';

// Admin-specific authentication functions
export const adminAuth = {
    // Login as admin
    login: async (email, password) => {
        try {
            const result = await login(email, password);

            if (result && result.user && result.user.role === 'admin') {
                console.log('Admin authentication successful');
                return result;
            } else {
                logout(); // Clear any stored data
                throw new Error('Admin access required');
            }
        } catch (error) {
            console.error('Admin login failed:', error);
            throw error;
        }
    },

    // Logout admin
    logout: () => {
        logout();
    },

    // Check if current user is admin
    isAuthenticated: () => {
        return isAdmin();
    },

    // Get current admin user
    getCurrentAdmin: () => {
        const user = getCurrentUser();
        return user && user.role === 'admin' ? user : null;
    },

    // Require admin authentication (for route protection)
    requireAuth: () => {
        if (!adminAuth.isAuthenticated()) {
            throw new Error('Admin authentication required');
        }
        return true;
    }
};

export default adminAuth;
