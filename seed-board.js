import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BoardMember from './models/BoardMember.js';

dotenv.config();

const initialMembers = [
  {
    name: "Dr_Zeee",
    role: "CEO & Founder | Science Communicator | Lab Specialist",
    description: "Driven by a passion to make science accessible, interactive, and beautifully engaging for all ages.",
    image: "https://i.ibb.co/Swf7dWKP/1253ad67-7fdc-438e-b138-3945c710d495.jpg",
    imagePosition: "center top",
    linkedin: "https://www.linkedin.com/in/zyad-khalil-856071288?trk=contact-info",
    facebook: "https://www.facebook.com/share/1WK8z3N1bD/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@zyadmarcello?is_from_webapp=1&sender_device=pc",
    ordering: 1,
    active: true
  },
  {
    name: "Dr- Manar",
    role: "Co-founder",
    description: "I'm a science communicator who can turn biology into fun and interactive experiences, and also let you experiment and explore everything on your own.",
    image: "https://i.ibb.co/tM3SJCFR/8e9c6115-2587-41b6-a9bf-36f459d64454.jpg",
    imagePosition: "center 30%",
    linkedin: "#",
    facebook: "#",
    tiktok: "#",
    ordering: 2,
    active: true
  }
];

const seedBoard = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    const count = await BoardMember.countDocuments();
    if (count === 0) {
      await BoardMember.insertMany(initialMembers);
      console.log('Seeded initial Board Members.');
    } else {
      console.log(`Board members already exist (${count} items).`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Board seeding error:', err);
    process.exit(1);
  }
};

seedBoard();
