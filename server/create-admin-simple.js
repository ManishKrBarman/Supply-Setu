import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI + 'supplysetu')
    .then(async () => {
        console.log('MongoDB connected');

        // Create admin user directly
        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            role: String,
            status: String
        }));

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123456', salt);

        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@supplysetu.com' });

        if (adminExists) {
            console.log('Admin user already exists:');
            console.log('Email: admin@supplysetu.com');
            console.log('Please use the correct password to login');
        } else {
            // Create admin user
            await User.create({
                name: 'Admin User',
                email: 'admin@supplysetu.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active'
            });

            console.log('Admin user created successfully:');
            console.log('Email: admin@supplysetu.com');
            console.log('Password: admin123456');
        }

        mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
