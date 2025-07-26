import express from 'express';
import {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    getSupplierWithProducts
} from '../controllers/supplierController.js';
import {
    getNearbySuppliers,
    seedMockSuppliers
} from '../controllers/supplierControllerExtended.js';
import { protect, checkRole, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllSuppliers);
router.route('/nearby').get(getNearbySuppliers);
router.route('/search').get(searchSuppliers);
router.route('/:id').get(getSupplierById);
router.route('/:id/products').get(getSupplierWithProducts);

// NOTE: Supplier creation is now handled through user registration
// with supplier role - not needed anymore as a separate endpoint
// router.route('/').post(createSupplier);

// Protected routes (suppliers can only update their own profile)
router.route('/:id')
    .put(protect, checkRole(['supplier', 'admin']), updateSupplier)
    .delete(protect, admin, deleteSupplier);

// Admin routes
router.route('/seed').post(protect, admin, seedMockSuppliers);

export default router;
