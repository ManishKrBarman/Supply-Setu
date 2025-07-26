import User from './models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'admin@supplysetu.com' });

        if (existingAdmin) {
            console.log('Admin already exists:', existingAdmin.email);
            console.log('Admin status:', existingAdmin.status);
            console.log('Admin role:', existingAdmin.role);

            // Update admin to ensure it's active
            existingAdmin.status = 'active';
            existingAdmin.isActive = true;
            await existingAdmin.save();
            console.log('Admin status updated to active');
        } else {
            console.log('Creating new admin user...');

            const admin = new User({
                name: 'System Administrator',
                email: 'admin@supplysetu.com',
                password: 'admin123', // This will be hashed by the pre-save hook
                role: 'admin',
                status: 'active',
                isActive: true
            });

            await admin.save();
            console.log('✅ Admin user created successfully');
            console.log('Email: admin@supplysetu.com');
            console.log('Password: admin123');
        }

        // Test password matching
        const testAdmin = await User.findOne({ email: 'admin@supplysetu.com' });
        const passwordMatch = await testAdmin.matchPassword('admin123');
        console.log('Password test:', passwordMatch ? '✅ Valid' : '❌ Invalid');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
