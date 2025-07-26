import dotenv from 'dotenv';
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Exists (not shown for security)' : 'Missing');
