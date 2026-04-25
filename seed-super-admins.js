import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const superAdmins = [
    {
        name: 'zeyad',
        email: 'zeyad@biospark.com',
        password: 'BioSpark@162',
        role: 'admin',
        isSuperAdmin: true,
        status: 'active'
    },
    {
        name: 'manar',
        email: 'manar@biospark.com',
        password: 'BioSpark@162',
        role: 'admin',
        isSuperAdmin: true,
        status: 'active'
    },
    {
        name: 'ahmed',
        email: 'ahmed@biospark.com',
        password: 'BioSpark@162',
        role: 'admin',
        isSuperAdmin: true,
        status: 'active'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing users first to be sure
        await User.deleteMany({});
        console.log('Cleared existing users.');

        // Insert new super admins
        for (const admin of superAdmins) {
            await User.create(admin);
            console.log(`Created Super Admin: ${admin.email}`);
        }

        console.log('Seeding completed successfully.');
        process.exit();
    } catch (err) {
        console.error('Error seeding users:', err);
        process.exit(1);
    }
};

seedUsers();
