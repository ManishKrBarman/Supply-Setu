const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Test basic server functionality
const testServer = async () => {
    console.log('🚀 Starting Server Test...\n');

    // Test 1: Environment variables
    console.log('=== Test 1: Environment Variables ===');
    console.log(`MONGO_URI: ${process.env.MONGO_URI ? '✅ Present' : '❌ Missing'}`);
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Present' : '❌ Missing'}`);
    console.log(`PORT: ${process.env.PORT || 5000}`);

    // Test 2: MongoDB connection
    console.log('\n=== Test 2: MongoDB Connection ===');
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');

        // Test database operations
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📊 Collections found: ${collections.map(c => c.name).join(', ')}`);

        await mongoose.disconnect();
        console.log('✅ MongoDB disconnected');
    } catch (error) {
        console.log('❌ MongoDB connection failed:', error.message);
    }

    // Test 3: Express server
    console.log('\n=== Test 3: Express Server ===');
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Test routes
    app.get('/api/test', (req, res) => {
        res.json({
            message: 'Server is working!',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        });
    });

    app.get('/api/health', (req, res) => {
        res.json({
            status: 'healthy',
            uptime: process.uptime(),
            memory: process.memoryUsage()
        });
    });

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`🌐 Test endpoints:`);
        console.log(`   http://localhost:${PORT}/api/test`);
        console.log(`   http://localhost:${PORT}/api/health`);
        console.log('\n💡 You can test these URLs in your browser');
        console.log('Press Ctrl+C to stop the server');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('\n🛑 Received SIGTERM, shutting down gracefully');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('\n🛑 Received SIGINT, shutting down gracefully');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
};

testServer().catch(console.error);
