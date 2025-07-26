import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

// User schema (matching your User model)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['vendor', 'supplier', 'admin'],
        default: 'vendor'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'active', 'suspended'],
        default: 'pending'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    rejectionReason: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create User model
const User = mongoose.model('User', userSchema);

// Admin user data
const adminData = {
    name: 'Admin User',
    email: 'admin@supplysetu.com',
    password: 'admin123456', // Will be hashed automatically
    role: 'admin',
    status: 'active',
    isApproved: true
};

const createAdminUser = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });

        if (existingAdmin) {
            console.log(`Admin user already exists with email: ${adminData.email}`);

            // Update the existing admin to ensure correct status
            existingAdmin.role = 'admin';
            existingAdmin.status = 'active';
            existingAdmin.isApproved = true;

            // Update password
            const salt = await bcrypt.genSalt(10);
            existingAdmin.password = await bcrypt.hash('admin123456', salt);

            await existingAdmin.save();
            console.log('Admin user updated successfully!');
        } else {
            // Create new admin user
            const admin = new User(adminData);
            await admin.save();
            console.log('Admin user created successfully!');
        }

        console.log('\n=================================');
        console.log('ADMIN LOGIN CREDENTIALS:');
        console.log('=================================');
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: admin123456`);
        console.log('=================================');
        console.log('Please change the password after first login!');
        console.log('=================================\n');

        // Test the admin user
        const testAdmin = await User.findOne({ email: adminData.email });
        if (testAdmin) {
            console.log('✅ Admin user verification successful');
            console.log(`   Name: ${testAdmin.name}`);
            console.log(`   Email: ${testAdmin.email}`);
            console.log(`   Role: ${testAdmin.role}`);
            console.log(`   Status: ${testAdmin.status}`);
            console.log(`   Approved: ${testAdmin.isApproved}`);
        }

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed');
        process.exit(0);
    }
};

// Run the function
createAdminUser();
