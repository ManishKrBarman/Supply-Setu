// Simple test to check API endpoints
import fetch from 'node-fetch';

const testAPI = async () => {
    const baseURL = 'http://localhost:3005/api';

    console.log('Testing API endpoints...\n');

    const endpoints = [
        '/health',
        '/admin/stats',
        '/admin/users/pending',
        '/users/login'
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const status = response.status;
            const text = await response.text();

            console.log(`${endpoint}: ${status} - ${text.substring(0, 100)}...`);
        } catch (error) {
            console.log(`${endpoint}: ERROR - ${error.message}`);
        }
    }
};

testAPI();
