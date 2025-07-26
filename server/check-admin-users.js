import mongoose from 'mongoose';

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://manishkumarbarman111:manish-supply-setu@supply-setu.xafssej.mongodb.net/supplysetu';

async function checkAdminUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');

        // Define a simple schema to query users
        const userSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', userSchema);

        // Find all users
        console.log('Checking for all users in the database:');
        const allUsers = await User.find({});
        console.log(`Total users found: ${allUsers.length}`);

        if (allUsers.length > 0) {
            allUsers.forEach((user, index) => {
                console.log(`User ${index + 1}:`);
                console.log(`  Email: ${user.email}`);
                console.log(`  Role: ${user.role}`);
                console.log(`  Status: ${user.status}`);
            });
        } else {
            console.log('No users found in the database');
        }

        // Find admin users
        console.log('\nChecking for admin users:');
        const adminUsers = await User.find({ role: 'admin' });

        if (adminUsers.length > 0) {
            console.log(`Found ${adminUsers.length} admin users:`);
            adminUsers.forEach((admin, index) => {
                console.log(`Admin ${index + 1}:`);
                console.log(`  Email: ${admin.email}`);
                console.log(`  Name: ${admin.name}`);
                console.log(`  Status: ${admin.status}`);
            });
        } else {
            console.log('No admin users found in the database');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

checkAdminUsers();
