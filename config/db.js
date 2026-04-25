import mongoose from 'mongoose';

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB...');
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connection Established Successfully!');
        console.log(`📡 Host: ${conn.connection.host}`);
        console.log(`🗃️  Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error(`🔍 Reason: ${error.message}`);
        console.log('💡 Tip: Make sure your local MongoDB service is running.');
        process.exit(1);
    }
};

export default connectDB;
