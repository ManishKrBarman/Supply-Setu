import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Admin user details
const adminUser = {
    name: 'Admin User',
    email: 'admin@supplysetu.com',
    password: 'admin123456', // You should change this to a secure password
    role: 'admin',
    status: 'active'
};

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);

        // Check if admin exists
        const existingAdmin = await User.findOne({ role: 'admin' });

        if (existingAdmin) {
            console.log(`Admin already exists with email: ${existingAdmin.email}`);
            console.log('To use this account, login with this email and the password you set when creating it.');
            console.log('If you forgot the password, you can manually update it in MongoDB.');
        } else {
            // Create admin user
            const admin = new User(adminUser);
            await admin.save();

            console.log('Admin user created successfully!');
            console.log('----------------------------------');
            console.log('Login with:');
            console.log(`Email: ${adminUser.email}`);
            console.log(`Password: ${adminUser.password}`);
            console.log('----------------------------------');
            console.log('IMPORTANT: Change this password after your first login!');
        }

        mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Execute the database connection and admin creation
connectDB();
