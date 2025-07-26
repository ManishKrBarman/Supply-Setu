import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb+srv://manishkumarbarman111:manish-supply-setu@supply-setu.xafssej.mongodb.net/supplysetu';

// Define User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create User model
const User = mongoose.model('User', userSchema);

async function createAdmin() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');

        // Check if admin exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists:');
            console.log(`Email: ${adminExists.email}`);

            // Reset admin password if needed
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123456', salt);

            adminExists.password = hashedPassword;
            adminExists.status = 'active';
            await adminExists.save();

            console.log('Admin password has been reset to: admin123456');
        } else {
            // Create admin user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123456', salt);

            const admin = new User({
                name: 'Admin User',
                email: 'admin@supplysetu.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active'
            });

            await admin.save();

            console.log('Admin user created successfully:');
            console.log('Email: admin@supplysetu.com');
            console.log('Password: admin123456');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the function
createAdmin();
