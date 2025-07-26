import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection string - replace with your actual connection string
const MONGO_URI = 'mongodb+srv://manishkumarbarman111:manish-supply-setu@supply-setu.xafssej.mongodb.net/supplysetu';

// Admin user details - you can customize these
const ADMIN_NAME = 'Admin User';
const ADMIN_EMAIL = 'admin@supplysetu.com';
const ADMIN_PASSWORD = 'admin123456';

async function forceCreateAdminUser() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');

        // Define User schema with required fields
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            role: String,
            status: String,
            isApproved: Boolean,
            createdAt: {
                type: Date,
                default: Date.now
            }
        });

        // Create the User model
        const User = mongoose.model('User', userSchema);

        // Check if a user with the admin email already exists
        const existingUser = await User.findOne({ email: ADMIN_EMAIL });

        if (existingUser) {
            console.log(`User with email ${ADMIN_EMAIL} already exists.`);
            console.log('Updating to ensure it has admin role and active status...');

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            // Update the user to have admin role and active status
            await User.updateOne(
                { email: ADMIN_EMAIL },
                {
                    $set: {
                        role: 'admin',
                        status: 'active',
                        isApproved: true,
                        password: hashedPassword
                    }
                }
            );

            console.log('User updated successfully with admin role and active status.');
        } else {
            console.log('Creating new admin user...');

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            // Create a new admin user
            const newAdmin = new User({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: 'admin',
                status: 'active',
                isApproved: true,
                createdAt: new Date()
            });

            await newAdmin.save();
            console.log('New admin user created successfully.');
        }

        // Verify the admin user exists
        const adminUser = await User.findOne({ email: ADMIN_EMAIL });
        if (adminUser) {
            console.log('\nAdmin user details:');
            console.log(`Name: ${adminUser.name}`);
            console.log(`Email: ${adminUser.email}`);
            console.log(`Role: ${adminUser.role}`);
            console.log(`Status: ${adminUser.status}`);
            console.log(`Is Approved: ${adminUser.isApproved}`);
            console.log('\nYou can now log in with:');
            console.log(`Email: ${ADMIN_EMAIL}`);
            console.log(`Password: ${ADMIN_PASSWORD}`);
        } else {
            console.log('Failed to verify admin user creation.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Execute the function
forceCreateAdminUser();
