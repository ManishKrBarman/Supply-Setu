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

const verificationDataSchema = new mongoose.Schema({
    registrationNumber: String,
    gstNumber: String,
    address: String,
    documents: [String],
    requestedAt: Date,
    verifiedAt: Date,
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectedAt: Date,
    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectionReason: String
}, { _id: false });

const supplierSchema = new mongoose.Schema({
    // Reference to user account
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required']
    },
    // Geolocation for mapping and nearby search
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0]
        }
    },
    gstNumber: {
        type: String,
        required: [true, 'GST number is required'],
        trim: true,
        unique: true,
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please provide a valid GST number']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    paymentTerms: {
        type: String,
        trim: true,
        enum: ['Immediate', 'Net 15', 'Net 30', 'Net 45', 'Net 60', 'Custom'],
        default: 'Net 30'
    },
    customPaymentTerms: {
        type: String,
        trim: true
    },
    // Verification and rating fields
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ['not_requested', 'pending', 'verified', 'rejected'],
        default: 'not_requested'
    },
    verificationData: verificationDataSchema,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    // Features offered by the supplier
    features: [{
        type: String
    }],
    categories: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
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
supplierSchema.index({ name: 'text', email: 'text', contactPerson: 'text' });

// Pre-save middleware to update the updatedAt field
supplierSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual property to get all products from this supplier
supplierSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'supplier'
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
