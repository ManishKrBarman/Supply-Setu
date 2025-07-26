import express from 'express';
import {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
    getTrendingFoods,
    getStreetFoodRecipes,
    seedMockFoods
} from '../controllers/foodController.js';
import { protect, checkRole, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getFoods);
router.get('/trending', getTrendingFoods);
router.get('/recipes', getStreetFoodRecipes);
router.get('/:id', getFoodById);

// Vendor routes - only vendors can create and manage foods (street food items)
router.post('/', protect, checkRole(['vendor']), createFood);
router.put('/:id', protect, checkRole(['vendor', 'admin']), updateFood);
router.delete('/:id', protect, checkRole(['vendor', 'admin']), deleteFood);

// Admin routes - seed data
router.post('/seed', protect, admin, seedMockFoods);

export default router;