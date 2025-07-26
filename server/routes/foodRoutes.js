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
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getFoods);
router.get('/trending', getTrendingFoods);
router.get('/recipes', getStreetFoodRecipes);
router.get('/:id', getFoodById);

// Protected routes - require login
router.post('/', protect, createFood);
router.put('/:id', protect, updateFood);
router.delete('/:id', protect, deleteFood);

// Admin routes - seed data
// Temporarily allowing public access to seed endpoint for testing purposes
router.post('/seed', seedMockFoods);

export default router;