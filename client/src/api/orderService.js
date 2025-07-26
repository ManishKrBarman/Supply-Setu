import api from './axios';

// Create a new order (vendor creates order from supplier)
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error creating order' };
    }
};

// Get all orders for the logged-in vendor
export const getVendorOrders = async () => {
    try {
        const response = await api.get('/orders/vendor');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching vendor orders' };
    }
};

// Get all orders for the logged-in supplier
export const getSupplierOrders = async () => {
    try {
        const response = await api.get('/orders/supplier');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching supplier orders' };
    }
};

// Get order details by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching order details' };
    }
};

// Update order status (supplier updates order status)
export const updateOrderStatus = async (orderId, statusData) => {
    try {
        const response = await api.put(`/orders/${orderId}/status`, statusData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error updating order status' };
    }
};

// Cancel order (vendor cancels their order)
export const cancelOrder = async (orderId, reason) => {
    try {
        const response = await api.put(`/orders/${orderId}/cancel`, { reason });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error cancelling order' };
    }
};

// Admin: Get all orders
export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders/admin');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching all orders' };
    }
};

// Admin: Update payment status
export const updatePaymentStatus = async (orderId, paymentData) => {
    try {
        const response = await api.put(`/orders/${orderId}/payment`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error updating payment status' };
    }
};
