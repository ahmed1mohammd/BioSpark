import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Program from './models/Program.js';

dotenv.config();

const defaultPrograms = [
  {
    title: 'School Workshops',
    slug: 'school-workshops',
    category: 'School Workshops',
    shortDescription: 'Interactive, curriculum-aligned biotechnology and biology workshops conducted right in your school science laboratories or classrooms.',
    fullDescription: 'Interactive, curriculum-aligned biotechnology and biology workshops conducted right in your school science laboratories or classrooms.',
    imageUrl: '/herosec.png',
    ordering: 1,
    active: true,
    featured: true
  },
  {
    title: 'Mobile Bio Lab',
    slug: 'mobile-bio-lab',
    category: 'Mobile Bio Lab',
    shortDescription: 'BioSpark brings a complete portable biotechnology laboratory directly to your school campus, fully equipped with centrifuges, PCR, and gel electrophoresis.',
    fullDescription: 'BioSpark brings a complete portable biotechnology laboratory directly to your school campus, fully equipped with centrifuges, PCR, and gel electrophoresis.',
    imageUrl: '/main.png',
    ordering: 2,
    active: true,
    featured: true
  },
  {
    title: 'Science Days & Fairs',
    slug: 'science-days-fairs',
    category: 'Science Days & Fairs',
    shortDescription: 'Large-scale interactive scientific booths, live demonstrations, 3D molecular modeling, and rapid experiments for school annual science fairs.',
    fullDescription: 'Large-scale interactive scientific booths, live demonstrations, 3D molecular modeling, and rapid experiments for school annual science fairs.',
    imageUrl: '/spark_character.png',
    ordering: 3,
    active: true,
    featured: true
  },
  {
    title: 'Custom Curricula Programs',
    slug: 'custom-curricula-programs',
    category: 'Custom Curricula Programs',
    shortDescription: 'Tailored biotechnology programs customized according to student age group, specific STEM curricula (IGCSE, IB, American Diploma), and school schedules.',
    fullDescription: 'Tailored biotechnology programs customized according to student age group, specific STEM curricula (IGCSE, IB, American Diploma), and school schedules.',
    imageUrl: '/About.png',
    ordering: 4,
    active: true,
    featured: true
  }
];

const seedPrograms = async () => {
  try {
    await connectDB();
    const count = await Program.countDocuments();
    if (count === 0) {
      await Program.insertMany(defaultPrograms);
      console.log('✅ Successfully seeded default School Programs!');
    } else {
      console.log(`ℹ️ Programs already exist (${count} programs).`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding programs:', err);
    process.exit(1);
  }
};

seedPrograms();
