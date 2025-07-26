import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    getAdminStats,
    getUsersForApproval,
    approveUser,
    rejectUser,
    getAllUsers,
    createAdmin
} from '../controllers/adminController.js';

const router = express.Router();

// Admin setup route (should be disabled in production)
router.post('/setup', createAdmin);

// Protected admin routes
router.get('/stats', protect, admin, getAdminStats);
router.get('/users/pending', protect, admin, getUsersForApproval);
router.put('/users/:id/approve', protect, admin, approveUser);
router.put('/users/:id/reject', protect, admin, rejectUser);
router.get('/users', protect, admin, getAllUsers);

export default router;
