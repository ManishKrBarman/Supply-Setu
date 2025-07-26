import api from './axios';

// Get admin dashboard statistics
export const getAdminStats = async () => {
    try {
        const response = await api.get('/admin/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        throw error.response?.data || { message: 'Failed to fetch admin statistics' };
    }
};

// Get users waiting for approval
export const getUsersForApproval = async () => {
    try {
        const response = await api.get('/admin/users/pending');
        return response.data;
    } catch (error) {
        console.error('Error fetching users for approval:', error);
        throw error.response?.data || { message: 'Failed to fetch users for approval' };
    }
};

// Approve a user
export const approveUser = async (userId) => {
    try {
        const response = await api.put(`/admin/users/${userId}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving user:', error);
        throw error.response?.data || { message: 'Failed to approve user' };
    }
};

// Reject a user
export const rejectUser = async (userId, data = {}) => {
    try {
        const response = await api.put(`/admin/users/${userId}/reject`, data);
        return response.data;
    } catch (error) {
        console.error('Error rejecting user:', error);
        throw error.response?.data || { message: 'Failed to reject user' };
    }
};

// Get all users
export const getAllUsers = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `/admin/users?${queryString}` : '/admin/users';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error.response?.data || { message: 'Failed to fetch users' };
    }
};

// Get user by ID
export const getUserById = async (userId) => {
    try {
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error.response?.data || { message: 'Failed to fetch user' };
    }
};

// Update user
export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`/admin/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error.response?.data || { message: 'Failed to update user' };
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error.response?.data || { message: 'Failed to delete user' };
    }
};

// Verify supplier
export const verifySupplier = async (supplierId) => {
    try {
        const response = await api.put(`/admin/suppliers/${supplierId}/verify`);
        return response.data;
    } catch (error) {
        console.error('Error verifying supplier:', error);
        throw error.response?.data || { message: 'Failed to verify supplier' };
    }
};

// Create admin user (only for initial setup)
export const createAdminUser = async (adminData) => {
    try {
        const response = await api.post('/admin/setup', adminData);
        return response.data;
    } catch (error) {
        console.error('Error creating admin:', error);
        throw error.response?.data || { message: 'Failed to create admin user' };
    }
};
