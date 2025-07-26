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

const supplierProfileSchema = new mongoose.Schema({
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
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true
    },
    contactEmail: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    contactPhone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address: addressSchema,
    gstNumber: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please provide a valid GST number']
    },
    businessType: {
        type: String,
        trim: true,
        enum: ['Wholesaler', 'Distributor', 'Manufacturer', 'Retailer', 'Other']
    },
    categories: [{
        type: String,
        trim: true
    }],
    establishedYear: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    logo: {
        type: String
    },
    website: {
        type: String,
        trim: true
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
    minOrderValue: {
        type: Number,
        min: 0
    },
    deliveryOptions: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
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

// Add index to improve search performance
supplierProfileSchema.index({ businessName: 'text', contactPerson: 'text', categories: 'text' });

// Pre-save middleware to update the updatedAt field
supplierProfileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const SupplierProfile = mongoose.model('SupplierProfile', supplierProfileSchema);

export default SupplierProfile;
