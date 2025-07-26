// Test vendor registration with actual HTTP request
import fetch from 'node-fetch';

const testVendorRegistrationAPI = async () => {
    const testData = {
        name: 'Test Vendor API',
        email: 'testvendorapi@test.com',
        password: 'testpassword123',
        businessName: 'Test Food Business API',
        contactPhone: '9876543210',
        foodType: 'North Indian',
        address: '123 Test Street, Test City'
    };

    try {
        console.log('Testing vendor registration API...\n');
        console.log('Test data:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:3005/api/users/register/vendor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        console.log('\nResponse status:', response.status);
        console.log('Response data:', JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log('✅ Vendor registration successful!');
        } else {
            console.log('❌ Vendor registration failed!');
            if (result.errors) {
                console.log('\nValidation errors:');
                result.errors.forEach(err => {
                    console.log(`- ${err.field}: ${err.message}`);
                });
            }
        }

    } catch (error) {
        console.error('❌ Error testing vendor registration:', error.message);
    }
};

// Test if server is running first
const checkServer = async () => {
    try {
        const response = await fetch('http://localhost:3005/api/health');
        if (response.ok) {
            console.log('✅ Server is running');
            await testVendorRegistrationAPI();
        } else {
            console.log('❌ Server health check failed');
        }
    } catch (error) {
        console.log('❌ Server is not running. Please start the server first.');
        console.log('Run: cd server && npm start');
    }
};

checkServer();
