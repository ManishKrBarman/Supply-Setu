import express from 'express';
import {
    registerVendor,
    registerSupplier,
    registerAdmin,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getPendingUsers,
    updateUserApproval,
    getUsers,
    deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register/vendor', registerVendor);
router.post('/register/supplier', registerSupplier);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.post('/register/admin', protect, admin, registerAdmin);
router.get('/pending', protect, admin, getPendingUsers);
router.put('/:id/approval', protect, admin, updateUserApproval);
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;
