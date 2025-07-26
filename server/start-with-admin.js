import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const createAdminAndStartServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3005;

    // Middleware
    app.use(cors());
    app.use(express.json());

    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Create admin user if doesn't exist
        console.log('Checking for admin user...');
        let admin = await User.findOne({ email: 'admin@supplysetu.com' });

        if (!admin) {
            console.log('Creating admin user...');
            admin = new User({
                name: 'System Administrator',
                email: 'admin@supplysetu.com',
                password: 'admin123',
                role: 'admin',
                status: 'active',
                isActive: true
            });
            await admin.save();
            console.log('✅ Admin user created');
        } else {
            // Ensure admin is active
            admin.status = 'active';
            admin.isActive = true;
            await admin.save();
            console.log('✅ Admin user verified and updated');
        }

        // Test password
        const passwordTest = await admin.matchPassword('admin123');
        console.log('Password verification:', passwordTest ? '✅' : '❌');

        console.log('\n📧 Admin Credentials:');
        console.log('Email: admin@supplysetu.com');
        console.log('Password: admin123');

        // Import and set up routes
        const userRoutes = await import('./routes/userRoutes.js');
        const adminRoutes = await import('./routes/adminRoutes.js');
        const productRoutes = await import('./routes/productRoutes.js');
        const supplierRoutes = await import('./routes/supplierRoutes.js');
        const foodRoutes = await import('./routes/foodRoutes.js');

        // Set up routes
        app.use('/api/users', userRoutes.default);
        app.use('/api/admin', adminRoutes.default);
        app.use('/api/products', productRoutes.default);
        app.use('/api/suppliers', supplierRoutes.default);
        app.use('/api/foods', foodRoutes.default);

        // Health check
        app.get('/api/health', (req, res) => {
            res.json({
                status: 'healthy',
                message: 'Server is running',
                timestamp: new Date().toISOString()
            });
        });

        // 404 handler
        app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                message: `Route not found: ${req.originalUrl}`
            });
        });

        // Start server
        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running on port ${PORT}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
            console.log(`🔐 Admin login: http://localhost:5173/admin/login`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdminAndStartServer();
