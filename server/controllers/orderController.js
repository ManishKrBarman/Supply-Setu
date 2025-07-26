import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import SupplierProfile from '../models/SupplierProfile.js';
import VendorProfile from '../models/VendorProfile.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private/Vendor
export const createOrder = async (req, res) => {
    try {
        const {
            supplierUserId,
            items,
            deliveryAddress,
            paymentMethod,
            notes
        } = req.body;

        const vendorId = req.user._id;

        // Verify that supplier exists
        const supplier = await User.findById(supplierUserId);
        if (!supplier || supplier.role !== 'supplier') {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Get vendor and supplier profiles
        const vendorProfile = await VendorProfile.findOne({ user: vendorId });
        const supplierProfile = await SupplierProfile.findOne({ user: supplierUserId });

        if (!vendorProfile || !supplierProfile) {
            return res.status(404).json({ message: 'Profile information not found' });
        }

        // Verify products exist and get their details
        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.productId}`
                });
            }

            // Validate that product belongs to the supplier
            if (product.supplier.toString() !== supplierUserId.toString()) {
                return res.status(400).json({
                    message: `Product ${product.name} does not belong to the selected supplier`
                });
            }

            const orderItem = {
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                unit: product.unit,
                price: product.price,
                total: product.price * item.quantity
            };

            orderItems.push(orderItem);
            totalAmount += orderItem.total;
        }

        // Calculate tax, shipping, etc. (simplified for now)
        const taxAmount = totalAmount * 0.05; // 5% tax example
        const shippingCharges = 100; // Fixed shipping charge example
        const discountAmount = 0; // No discount for now
        const grandTotal = totalAmount + taxAmount + shippingCharges - discountAmount;

        // Create order
        const order = await Order.create({
            vendor: vendorId,
            vendorDetails: {
                name: req.user.name,
                businessName: vendorProfile.businessName,
                contactPhone: vendorProfile.contactPhone,
                address: vendorProfile.address
            },
            supplier: supplierUserId,
            supplierDetails: {
                name: supplier.name,
                businessName: supplierProfile.businessName,
                contactPhone: supplierProfile.contactPhone,
                address: supplierProfile.address
            },
            items: orderItems,
            totalAmount,
            taxAmount,
            shippingCharges,
            discountAmount,
            grandTotal,
            paymentMethod,
            deliveryAddress: deliveryAddress || vendorProfile.address,
            notes,
            statusHistory: [{ status: 'Pending', note: 'Order placed' }]
        });

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                _id: order._id,
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                grandTotal: order.grandTotal,
                orderStatus: order.orderStatus,
                createdAt: order.createdAt
            }
        });
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all orders for logged in vendor
// @route   GET /api/orders/vendor
// @access  Private/Vendor
export const getVendorOrders = async (req, res) => {
    try {
        const orders = await Order.find({ vendor: req.user._id })
            .select('orderNumber supplierDetails totalAmount grandTotal orderStatus paymentStatus createdAt expectedDeliveryDate')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Error in getVendorOrders:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all orders for logged in supplier
// @route   GET /api/orders/supplier
// @access  Private/Supplier
export const getSupplierOrders = async (req, res) => {
    try {
        const orders = await Order.find({ supplier: req.user._id })
            .select('orderNumber vendorDetails totalAmount grandTotal orderStatus paymentStatus createdAt expectedDeliveryDate')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Error in getSupplierOrders:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Restricted to order owner - vendor/supplier)
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product', 'name description image');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the user is vendor or supplier of this order
        const isAuthorized =
            order.vendor.toString() === req.user._id.toString() ||
            order.supplier.toString() === req.user._id.toString() ||
            req.user.role === 'admin';

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error in getOrderById:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update order status (for supplier)
// @route   PUT /api/orders/:id/status
// @access  Private/Supplier
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, note, expectedDeliveryDate } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only the supplier or admin can update the order status
        if (order.supplier.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }

        // Check if the status transition is valid
        const validStatusTransitions = {
            'Pending': ['Processing', 'Cancelled'],
            'Processing': ['Shipped', 'Cancelled'],
            'Shipped': ['Delivered', 'Returned'],
            'Delivered': ['Returned'],
            'Cancelled': [],
            'Returned': []
        };

        if (!validStatusTransitions[order.orderStatus].includes(status)) {
            return res.status(400).json({
                message: `Invalid status transition from ${order.orderStatus} to ${status}`
            });
        }

        // Update the order status
        order.orderStatus = status;
        order.statusHistory.push({ status, note, timestamp: Date.now() });

        if (expectedDeliveryDate) {
            order.expectedDeliveryDate = expectedDeliveryDate;
        }

        if (status === 'Delivered') {
            order.actualDeliveryDate = Date.now();
        }

        await order.save();

        res.json({
            message: 'Order status updated successfully',
            order: {
                _id: order._id,
                orderNumber: order.orderNumber,
                orderStatus: order.orderStatus,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        console.error('Error in updateOrderStatus:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update payment status (for admin or system use)
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus, paymentMethod, note } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only admin can update payment status directly
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update payment status' });
        }

        // Update payment info
        order.paymentStatus = paymentStatus;
        if (paymentMethod) {
            order.paymentMethod = paymentMethod;
        }

        order.statusHistory.push({
            status: order.orderStatus,
            note: `Payment status updated to ${paymentStatus}${note ? ': ' + note : ''}`,
            timestamp: Date.now()
        });

        await order.save();

        res.json({
            message: 'Payment status updated successfully',
            order: {
                _id: order._id,
                orderNumber: order.orderNumber,
                paymentStatus: order.paymentStatus,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        console.error('Error in updatePaymentStatus:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Cancel order (for vendor)
// @route   PUT /api/orders/:id/cancel
// @access  Private/Vendor
export const cancelOrder = async (req, res) => {
    try {
        const { reason } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only the vendor who placed the order can cancel it
        if (order.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this order' });
        }

        // Can only cancel if order is still pending or processing
        if (!['Pending', 'Processing'].includes(order.orderStatus)) {
            return res.status(400).json({
                message: `Cannot cancel order in ${order.orderStatus} status`
            });
        }

        // Update the order status
        order.orderStatus = 'Cancelled';
        order.statusHistory.push({
            status: 'Cancelled',
            note: reason || 'Cancelled by vendor',
            timestamp: Date.now()
        });

        await order.save();

        res.json({
            message: 'Order cancelled successfully',
            order: {
                _id: order._id,
                orderNumber: order.orderNumber,
                orderStatus: order.orderStatus,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        console.error('Error in cancelOrder:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all orders (for admin)
// @route   GET /api/orders/admin
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .select('orderNumber vendorDetails supplierDetails totalAmount grandTotal orderStatus paymentStatus createdAt')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
