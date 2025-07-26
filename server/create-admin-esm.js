import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Define a simple User schema
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            role: String,
            status: String,
            isApproved: Boolean
        });

        // Create User model
        const User = mongoose.model('User', userSchema);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@supplysetu.com' });

        if (existingAdmin) {
            console.log('Admin already exists, updating password and status...');

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123456', salt);

            // Update the admin
            await User.updateOne(
                { email: 'admin@supplysetu.com' },
                {
                    $set: {
                        password: hashedPassword,
                        status: 'active',
                        role: 'admin',
                        isApproved: true
                    }
                }
            );

            console.log('Admin updated successfully');
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123456', salt);

            // Create admin user
            const admin = new User({
                name: 'Admin User',
                email: 'admin@supplysetu.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active',
                isApproved: true
            });

            await admin.save();
            console.log('Admin created successfully');
        }

        console.log('\nAdmin Login Details:');
        console.log('Email: admin@supplysetu.com');
        console.log('Password: admin123456');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
}

createAdminUser();
