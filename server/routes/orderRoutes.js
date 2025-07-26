import express from 'express';
import {
    createOrder,
    getVendorOrders,
    getSupplierOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
    getAllOrders
} from '../controllers/orderController.js';
import { protect, checkRole, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Vendor routes
router.route('/')
    .post(protect, checkRole(['vendor']), createOrder);

router.route('/vendor')
    .get(protect, checkRole(['vendor']), getVendorOrders);

router.route('/:id/cancel')
    .put(protect, checkRole(['vendor']), cancelOrder);

// Supplier routes
router.route('/supplier')
    .get(protect, checkRole(['supplier']), getSupplierOrders);

router.route('/:id/status')
    .put(protect, checkRole(['supplier', 'admin']), updateOrderStatus);

// Admin routes
router.route('/admin')
    .get(protect, admin, getAllOrders);

router.route('/:id/payment')
    .put(protect, admin, updatePaymentStatus);

// Common route for both vendor and supplier
router.route('/:id')
    .get(protect, checkRole(['vendor', 'supplier', 'admin']), getOrderById);

export default router;
