import express from 'express';
import { protect, admin, checkRole } from '../middleware/authMiddleware.js';
import {
    requestVerification,
    getVerificationStatus,
    approveVerification,
    rejectVerification,
    rateSupplier,
    getSupplierRatings,
    getNearbySuppliers
} from '../controllers/supplierVerificationController.js';

const router = express.Router();

// Verification routes
router.post('/:id/verification/request', protect, requestVerification);
router.get('/:id/verification/status', protect, getVerificationStatus);
router.put('/:id/verification/approve', protect, admin, approveVerification);
router.put('/:id/verification/reject', protect, admin, rejectVerification);

// Rating routes
router.post('/:id/ratings', protect, rateSupplier);
router.get('/:id/ratings', getSupplierRatings);

// Geolocation routes
router.get('/nearby', getNearbySuppliers);

export default router;
