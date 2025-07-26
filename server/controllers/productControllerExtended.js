import { Product } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';
import { mockProducts, mockPriceTrends } from '../mockData/productMockData.js';

// Get product price trends
export const getProductPriceTrends = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // In a real app, we would query the price history for this product
        // For now, return mock price trend data
        const product = await Product.findById(id);
        if (!product) {
            throw new ErrorResponse('Product not found', 404);
        }

        // If the product exists in our mock data, return its price history
        const mockProduct = mockProducts.find(p => p._id === id);
        if (mockProduct && mockProduct.priceHistory) {
            return res.status(200).json({
                success: true,
                data: {
                    priceHistory: mockProduct.priceHistory,
                    predictedPrices: mockProduct.predictedPrices
                }
            });
        }

        // Otherwise return generic mock data
        res.status(200).json({
            success: true,
            data: mockPriceTrends
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
});

// Seed mock product data
export const seedMockProducts = asyncHandler(async (req, res) => {
    try {
        // Clear existing data
        await Product.deleteMany({});

        // Insert mock products
        const products = await Product.insertMany(req.body || mockProducts);

        res.status(201).json({
            success: true,
            message: 'Mock product data seeded successfully',
            count: products.length
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 400);
    }
});

// Get trending products
export const getTrendingProducts = asyncHandler(async (req, res) => {
    try {
        // In a real app, we would have a field like isTrending or use analytics data
        // For now, filter mock data for trending products
        const trendingProducts = mockProducts.filter(p => p.isTrending === true);

        res.status(200).json({
            success: true,
            count: trendingProducts.length,
            data: trendingProducts
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
});
