import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingredient name is required'],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, 'Quantity is required'],
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    }
});

const nutritionalInfoSchema = new mongoose.Schema({
    calories: {
        type: Number,
        required: false,
        min: 0
    },
    protein: {
        type: Number,
        required: false,
        min: 0
    },
    carbs: {
        type: Number,
        required: false,
        min: 0
    },
    fat: {
        type: Number,
        required: false,
        min: 0
    }
});

const costAnalysisSchema = new mongoose.Schema({
    ingredientCost: {
        type: Number,
        required: false,
        min: 0
    },
    laborCost: {
        type: Number,
        required: false,
        min: 0
    },
    overheadCost: {
        type: Number,
        required: false,
        min: 0
    },
    profitMargin: {
        type: Number,
        required: false,
        min: 0
    }
});

const supplierInfoSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: false
    },
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true
    },
    items: [{
        type: String,
        required: false
    }]
});

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Food description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    preparationTime: {
        type: Number,
        required: false,
        min: 0
    },
    ingredients: [ingredientSchema],
    nutritionalInfo: nutritionalInfoSchema,
    allergens: [{
        type: String,
        required: false
    }],
    popularity: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    imageUrl: {
        type: String,
        required: false
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        required: false
    }],
    region: {
        type: String,
        required: false
    },
    servingSize: {
        type: String,
        required: false
    },
    costAnalysis: costAnalysisSchema,
    supplierInfo: [supplierInfoSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Add index to improve search performance
foodSchema.index({ name: 'text', description: 'text', category: 'text', tags: 'text' });

// Pre-save middleware to update the updatedAt field
foodSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Food = mongoose.model('Food', foodSchema);

export default Food;