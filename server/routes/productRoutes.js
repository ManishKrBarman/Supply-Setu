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

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/search').get(searchProducts);
router.route('/trending').get(getTrendingProducts);
// Temporarily allowing public access to seed endpoint for testing purposes
router.route('/seed').post(seedMockProducts);
router.route('/supplier/:supplierId').get(getProductsBySupplier);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);
router.route('/:id/price-trends').get(getProductPriceTrends);

export default router;
