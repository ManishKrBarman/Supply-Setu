import User from './models/User.js';
import VendorProfile from './models/VendorProfile.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testVendorRegistration = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Test vendor registration data
        const testData = {
            name: 'Test Vendor',
            email: 'testvendor@test.com',
            password: 'testpassword123',
            businessName: 'Test Food Business',
            contactPhone: '9876543210',
            foodType: 'North Indian',
            address: '123 Test Street, Test City'
        };

        console.log('\n1. Testing User creation...');

        // Check if user already exists
        const existingUser = await User.findOne({ email: testData.email });
        if (existingUser) {
            console.log('Deleting existing test user...');
            await User.deleteOne({ email: testData.email });
            await VendorProfile.deleteOne({ user: existingUser._id });
        }

        // Create user
        const user = await User.create({
            name: testData.name,
            email: testData.email,
            password: testData.password,
            role: 'vendor',
            status: 'pending',
            location: {
                address: testData.address
            }
        });

        console.log('✅ User created successfully:', user._id);

        console.log('\n2. Testing VendorProfile creation...');

        // Create vendor profile
        const vendorProfile = await VendorProfile.create({
            user: user._id,
            businessName: testData.businessName,
            contactPhone: testData.contactPhone,
            foodType: Array.isArray(testData.foodType) ? testData.foodType : [testData.foodType],
            address: {
                street: testData.address || 'Not specified',
                city: 'Not specified',
                state: 'Not specified',
                country: 'India',
                pincode: '000000'
            }
        });

        console.log('✅ VendorProfile created successfully:', vendorProfile._id);

        console.log('\n✅ Vendor registration test completed successfully!');

        // Clean up test data
        await User.deleteOne({ _id: user._id });
        await VendorProfile.deleteOne({ _id: vendorProfile._id });
        console.log('Test data cleaned up');

    } catch (error) {
        console.error('❌ Vendor registration test failed:', error);

        if (error.errors) {
            console.log('\nValidation errors:');
            Object.keys(error.errors).forEach(key => {
                console.log(`- ${key}: ${error.errors[key].message}`);
            });
        }
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

testVendorRegistration();
