import Food from '../models/Food.js';
import { mockFoods, mockTrendingFoods, mockStreetFoodRecipes } from '../mockData/foodMockData.js';

// Get all foods
export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food by ID
export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new food
export const createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update food
export const updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFood) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete food
export const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get trending foods
export const getTrendingFoods = async (req, res) => {
    try {
        // In a real app, we would query foods with isTrending: true and sort by popularity
        const trendingFoods = await Food.find({ isTrending: true }).sort({ popularity: -1 }).limit(5);

        // If no trending foods in the database yet, return mock data
        if (trendingFoods.length === 0) {
            return res.status(200).json(mockTrendingFoods);
        }

        res.status(200).json(trendingFoods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get street food recipes
export const getStreetFoodRecipes = async (req, res) => {
    try {
        // This would typically come from a database, but for now we return mock data
        res.status(200).json(mockStreetFoodRecipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Seed mock food data
export const seedMockFoods = async (req, res) => {
    try {
        // Clear existing data
        await Food.deleteMany({});

        // Insert mock foods
        const foods = await Food.insertMany(req.body || mockFoods);

        res.status(201).json({
            message: 'Mock food data seeded successfully',
            count: foods.length,
            success: true
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};