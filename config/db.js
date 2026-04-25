import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    console.log('Attempting to connect to MongoDB...');
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Options for better performance
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = conn.connections[0].readyState;
        console.log('✅ MongoDB Connection Established Successfully!');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error(`🔍 Reason: ${error.message}`);
    }
};

export default connectDB;
