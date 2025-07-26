// Test suppliers endpoint
console.log('Testing suppliers endpoint...');

const testSuppliers = async () => {
    try {
        const response = await fetch('http://localhost:3005/api/suppliers');
        const data = await response.json();

        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(data, null, 2));

        if (data.success && Array.isArray(data.data)) {
            console.log('✅ Suppliers endpoint working correctly');
            console.log('Number of suppliers:', data.data.length);
        } else {
            console.log('⚠️ Unexpected response format');
        }
    } catch (error) {
        console.error('❌ Error testing suppliers endpoint:', error.message);
    }
};

testSuppliers();
