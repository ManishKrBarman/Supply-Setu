import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import userRoutes from './routes/userRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3005;

// Connect to MongoDB
console.log(`Connecting to MongoDB...`);
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.log("MongoDB connection error:", err);
        console.log("Full error details:", JSON.stringify(err, null, 2));
    });

// Set up Mongoose to use global promises
mongoose.Promise = global.Promise;

// Set up mongoose connection events for better debugging
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Supply Setu API',
        version: '1.0.0',
        status: 'active',
        endpoints: {
            products: '/api/products',
            suppliers: '/api/suppliers',
            users: '/api/users',
            foods: '/api/foods'
        }
    });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

// 404 Handler - For unmatched routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});