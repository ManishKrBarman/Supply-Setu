import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    total: {
        type: Number,
        required: true,
        min: [0, 'Total cannot be negative']
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendorDetails: {
        name: String,
        businessName: String,
        contactPhone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            pincode: String
        }
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    supplierDetails: {
        name: String,
        businessName: String,
        contactPhone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            pincode: String
        }
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be negative']
    },
    taxAmount: {
        type: Number,
        default: 0
    },
    shippingCharges: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        required: true,
        min: [0, 'Grand total cannot be negative']
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Online', 'Bank Transfer', 'UPI', 'Credit'],
        default: 'COD'
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Pending'
    },
    deliveryAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'India'
        },
        pincode: {
            type: String,
            required: true
        }
    },
    expectedDeliveryDate: {
        type: Date
    },
    actualDeliveryDate: {
        type: Date
    },
    notes: {
        type: String
    },
    statusHistory: [{
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned']
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        note: String
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

// Generate order number before saving
orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const count = await mongoose.models.Order.countDocuments();
        const sequence = (count + 1).toString().padStart(4, '0');

        this.orderNumber = `ORD-${year}${month}${day}-${sequence}`;
    }

    // Calculate totals
    if (this.isModified('items') || this.isNew) {
        // Calculate individual item totals
        this.items.forEach(item => {
            item.total = item.quantity * item.price;
        });

        // Calculate order total
        this.totalAmount = this.items.reduce((sum, item) => sum + item.total, 0);

        // Calculate grand total
        this.grandTotal = this.totalAmount + this.taxAmount + this.shippingCharges - this.discountAmount;
    }

    this.updatedAt = Date.now();
    next();
});

// Add index for better search performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ vendor: 1 });
orderSchema.index({ supplier: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
