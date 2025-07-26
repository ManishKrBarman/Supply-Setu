import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsBySupplier
} from '../controllers/productController.js';
import {
    getProductPriceTrends,
    seedMockProducts,
    getTrendingProducts
} from '../controllers/productControllerExtended.js';
import { protect, checkRole, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllProducts);
router.route('/search').get(searchProducts);
router.route('/trending').get(getTrendingProducts);
router.route('/supplier/:supplierId').get(getProductsBySupplier);
router.route('/:id').get(getProductById);
router.route('/:id/price-trends').get(getProductPriceTrends);

// Supplier routes (only suppliers can create products)
router.route('/').post(protect, checkRole(['supplier']), createProduct);

// Protected routes (supplier can only update/delete their own products)
router.route('/:id')
    .put(protect, checkRole(['supplier', 'admin']), updateProduct)
    .delete(protect, checkRole(['supplier', 'admin']), deleteProduct);

// Admin routes
router.route('/seed').post(protect, admin, seedMockProducts);

export default router;
