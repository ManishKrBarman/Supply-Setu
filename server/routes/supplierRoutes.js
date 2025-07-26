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

const router = express.Router();

router.route('/').get(getAllSuppliers).post(createSupplier);
router.route('/nearby').get(getNearbySuppliers);
// Temporarily allowing public access to seed endpoint for testing purposes
router.route('/seed').post(seedMockSuppliers);
router.route('/search').get(searchSuppliers);
router.route('/:id').get(getSupplierById).put(updateSupplier).delete(deleteSupplier);
router.route('/:id/products').get(getSupplierWithProducts);

export default router;
