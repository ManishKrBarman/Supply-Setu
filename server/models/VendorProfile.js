import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        default: 'India'
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
    }
});

const vendorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: [true, 'Business name is required'],
        trim: true
    },
    foodType: [{
        type: String,
        enum: ['North Indian', 'South Indian', 'Chinese', 'Fast Food', 'Chaat', 'Beverages', 'Sweets', 'Other'],
        required: [true, 'Food type is required']
    }],
    contactPhone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address: addressSchema,
    businessLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0] // [longitude, latitude]
        }
    },
    fssaiLicense: {
        type: String,
        trim: true
    },
    gstNumber: {
        type: String,
        trim: true,
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please provide a valid GST number']
    },
    establishedYear: {
        type: Number
    },
    averageDailySales: {
        type: Number,
        min: 0
    },
    businessHours: {
        open: {
            type: String,
            default: '09:00'
        },
        close: {
            type: String,
            default: '21:00'
        }
    },
    businessDays: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    description: {
        type: String,
        trim: true
    },
    logo: {
        type: String
    },
    images: [{
        type: String
    }],
    menu: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String
        },
        isVegetarian: {
            type: Boolean,
            default: true
        },
        ingredients: [{
            type: String
        }]
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    preferredSuppliers: [{
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier'
        },
        name: {
            type: String
        },
        notes: {
            type: String
        }
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationDocuments: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create 2dsphere index for location-based queries
vendorProfileSchema.index({ businessLocation: '2dsphere' });

// Add text index for search
vendorProfileSchema.index({ businessName: 'text', description: 'text', foodType: 'text' });

// Pre-save middleware to update the updatedAt field
vendorProfileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);

export default VendorProfile;
