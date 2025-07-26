import mongoose from 'mongoose';

const productApprovalSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDetails: {
        name: String,
        description: String,
        price: Number,
        category: String,
        unit: String,
        images: [String]
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    adminFeedback: {
        type: String
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
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

// Pre-save middleware to update the updatedAt field
productApprovalSchema.pre('save', function (next) {
    if (this.isModified('status') && (this.status === 'Approved' || this.status === 'Rejected')) {
        this.reviewedAt = Date.now();
    }
    this.updatedAt = Date.now();
    next();
});

// Add index for better search performance
productApprovalSchema.index({ status: 1 });
productApprovalSchema.index({ supplier: 1 });
productApprovalSchema.index({ createdAt: -1 });

const ProductApproval = mongoose.model('ProductApproval', productApprovalSchema);

export default ProductApproval;
