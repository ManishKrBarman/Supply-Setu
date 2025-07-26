import { Supplier } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';
import { mockSuppliers } from '../mockData/supplierMockData.js';

// Get nearby suppliers
export const getNearbySuppliers = asyncHandler(async (req, res) => {
    try {
        // In a real app, we would use geolocation data to find nearby suppliers
        // For now, return mock suppliers sorted by distance
        const nearbySuppliers = [...mockSuppliers].sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            count: nearbySuppliers.length,
            data: nearbySuppliers
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
});

// Seed mock supplier data
export const seedMockSuppliers = asyncHandler(async (req, res) => {
    try {
        // Clear existing data
        await Supplier.deleteMany({});

        // Insert mock suppliers
        const suppliers = await Supplier.insertMany(req.body || mockSuppliers);

        res.status(201).json({
            success: true,
            message: 'Mock supplier data seeded successfully',
            count: suppliers.length
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 400);
    }
});
