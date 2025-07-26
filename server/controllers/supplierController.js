import { Supplier } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';

// Get all suppliers
export const getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find().sort({ name: 1 });

    res.status(200).json({
        success: true,
        count: suppliers.length,
        data: suppliers
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
