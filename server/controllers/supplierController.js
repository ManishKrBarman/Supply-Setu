import { Supplier } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';

// Helper function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

// Get all suppliers
export const getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find().sort({ name: 1 });

    res.status(200).json({
        success: true,
        count: suppliers.length,
        data: suppliers
    });
});

// Get nearby suppliers based on location
export const getNearbySuppliers = asyncHandler(async (req, res) => {
    const { lat, lng, radius = 10, category } = req.query;

    if (!lat || !lng) {
        throw new ErrorResponse('Latitude and longitude are required', 400);
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchRadius = parseFloat(radius);

    if (isNaN(userLat) || isNaN(userLng) || isNaN(searchRadius)) {
        throw new ErrorResponse('Invalid coordinates or radius', 400);
    }

    // Build query filters
    let query = {};
    if (category && category !== 'all') {
        query.category = new RegExp(category, 'i');
    }

    // Get all suppliers (with optional category filter)
    const allSuppliers = await Supplier.find(query);

    // Filter suppliers by distance and add distance information
    const nearbySuppliers = allSuppliers
        .map(supplier => {
            // Check if supplier has location data
            if (!supplier.location || !supplier.location.coordinates) {
                return null;
            }

            const [supplierLng, supplierLat] = supplier.location.coordinates;
            const distance = calculateDistance(userLat, userLng, supplierLat, supplierLng);

            if (distance <= searchRadius) {
                return {
                    ...supplier.toObject(),
                    distance: parseFloat(distance.toFixed(2))
                };
            }
            return null;
        })
        .filter(supplier => supplier !== null)
        .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
        success: true,
        count: nearbySuppliers.length,
        data: nearbySuppliers,
        searchParams: {
            userLocation: { lat: userLat, lng: userLng },
            radius: searchRadius,
            category: category || 'all'
        }
    });
});

// Get a single supplier by ID
export const getSupplierById = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
        throw new ErrorResponse('Supplier not found', 404);
    }

    res.status(200).json({
        success: true,
        data: supplier
    });
});

// Create a new supplier
export const createSupplier = asyncHandler(async (req, res) => {
    const supplier = await Supplier.create(req.body);

    res.status(201).json({
        success: true,
        data: supplier
    });
});

// Update a supplier
export const updateSupplier = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!supplier) {
        throw new ErrorResponse('Supplier not found', 404);
    }

    res.status(200).json({
        success: true,
        data: supplier
    });
});

// Delete a supplier
export const deleteSupplier = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
        throw new ErrorResponse('Supplier not found', 404);
    }

    res.status(200).json({
        success: true,
        message: 'Supplier deleted successfully'
    });
});

// Search suppliers
export const searchSuppliers = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        throw new ErrorResponse('Search query is required', 400);
    }

    const suppliers = await Supplier.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
    )
        .sort({ score: { $meta: 'textScore' } });

    res.status(200).json({
        success: true,
        count: suppliers.length,
        data: suppliers
    });
});

// Get supplier with products
export const getSupplierWithProducts = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
        throw new ErrorResponse('Supplier not found', 404);
    }

    // Populate virtual 'products' field
    await supplier.populate({
        path: 'products',
        select: 'name price quantity unit category isAvailable'
    });

    res.status(200).json({
        success: true,
        data: supplier
    });
});
