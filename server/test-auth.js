import User from './models/User.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testAuthentication = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Test 1: Check if admin user exists
        console.log('\n=== Test 1: Check Admin User ===');
        const adminUser = await User.findOne({ email: 'admin@supplysetu.com' });
        if (adminUser) {
            console.log('✅ Admin user found:');
            console.log(`   Email: ${adminUser.email}`);
            console.log(`   Role: ${adminUser.role}`);
            console.log(`   Status: ${adminUser.status}`);
            console.log(`   Active: ${adminUser.isActive}`);
        } else {
            console.log('❌ Admin user not found');

            // Create admin user
            console.log('\n🔄 Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const newAdmin = new User({
                name: 'System Administrator',
                email: 'admin@supplysetu.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active',
                isActive: true
            });

            await newAdmin.save();
            console.log('✅ Admin user created successfully');
        }

        // Test 2: Check all users
        console.log('\n=== Test 2: All Users ===');
        const allUsers = await User.find({});
        console.log(`Total users: ${allUsers.length}`);

        allUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email})`);
            console.log(`   Role: ${user.role}, Status: ${user.status}, Active: ${user.isActive}`);
        });

        // Test 3: Password verification
        console.log('\n=== Test 3: Password Verification ===');
        const testUser = await User.findOne({ email: 'admin@supplysetu.com' });
        if (testUser) {
            const isPasswordValid = await testUser.matchPassword('admin123');
            console.log(`Admin password test: ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
        }

        // Test 4: Create test users for different roles
        console.log('\n=== Test 4: Create Test Users ===');

        const testUsers = [
            {
                name: 'Test Vendor',
                email: 'vendor@test.com',
                password: 'vendor123',
                role: 'vendor',
                status: 'active',
                isActive: true
            },
            {
                name: 'Test Supplier',
                email: 'supplier@test.com',
                password: 'supplier123',
                role: 'supplier',
                status: 'active',
                isActive: true
            },
            {
                name: 'Pending User',
                email: 'pending@test.com',
                password: 'pending123',
                role: 'vendor',
                status: 'pending',
                isActive: false
            }
        ];

        for (const userData of testUsers) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(userData.password, 12);
                const user = new User({
                    ...userData,
                    password: hashedPassword
                });
                await user.save();
                console.log(`✅ Created test user: ${userData.email}`);
            } else {
                console.log(`⏭️  Test user already exists: ${userData.email}`);
            }
        }

        console.log('\n=== Authentication Test Complete ===');
        console.log('Test credentials:');
        console.log('Admin: admin@supplysetu.com / admin123');
        console.log('Vendor: vendor@test.com / vendor123');
        console.log('Supplier: supplier@test.com / supplier123');
        console.log('Pending: pending@test.com / pending123');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
};

// Run the test
testAuthentication();
