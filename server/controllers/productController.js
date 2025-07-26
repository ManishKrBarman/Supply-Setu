import { Product } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';
import { mockProducts, mockPriceTrends } from '../mockData/productMockData.js';

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
        .populate('supplier', 'name email phone')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// Get a single product by ID
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('supplier', 'name email phone address');

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    res.status(200).json({
        success: true,
        data: product
    });
});

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });
});

// Update a product
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    res.status(200).json({
        success: true,
        data: product
    });
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        throw new ErrorResponse('Product not found', 404);
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// Search products
export const searchProducts = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        throw new ErrorResponse('Search query is required', 400);
    }

    const products = await Product.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
    )
        .sort({ score: { $meta: 'textScore' } })
        .populate('supplier', 'name email phone');

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// Get products by supplier ID
export const getProductsBySupplier = asyncHandler(async (req, res) => {
    const products = await Product.find({ supplier: req.params.supplierId })
        .populate('supplier', 'name email phone');

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});
