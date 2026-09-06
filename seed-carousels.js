import dotenv from 'dotenv';
import connectDB from './config/db.js';
import CarouselSlide from './models/CarouselSlide.js';

dotenv.config();

const defaultSlides = [
  // Home Page Carousel Slides
  {
    page: 'home',
    eyebrow: 'BIOSPARK BIOTECHNOLOGY',
    headline: 'Biology & Biotechnology Brought to Life.',
    description: 'Transforming traditional science lessons into interactive labs, 3D visualizations, and live discovery.',
    primaryBtnText: 'For Schools',
    primaryBtnLink: '/for-schools',
    secondaryBtnText: 'Shop',
    secondaryBtnLink: '/shop',
    imageUrl: '/herosec.png',
    order: 1,
    isActive: true
  },
  {
    page: 'home',
    eyebrow: 'HANDS-ON STEM EXPERIENCES',
    headline: 'Empower Students With Authentic Science',
    description: 'Real-world molecular biology, DNA extraction, and biotechnology equipment right in your classroom.',
    primaryBtnText: 'Explore Workshops',
    primaryBtnLink: '/workshops',
    secondaryBtnText: 'View Camps',
    secondaryBtnLink: '/camps',
    imageUrl: '/main.png',
    order: 2,
    isActive: true
  },
  {
    page: 'home',
    eyebrow: 'MEET SPARKY & THE TEAM',
    headline: 'Ignite Curiosity & Scientific Discovery',
    description: 'Our mobile laboratory brings world-class equipment and expert instructors directly to your school.',
    primaryBtnText: 'Book a Demo',
    secondaryBtnLink: '/for-schools',
    secondaryBtnText: 'Learn More',
    imageUrl: '/spark_character.png',
    order: 3,
    isActive: true
  },

  // For Schools Page Carousel Slides
  {
    page: 'for-schools',
    eyebrow: 'BIOTECHNOLOGY FOR SCHOOLS',
    headline: 'Bring BioSpark to Your School',
    description: 'Transform science education through hands-on biotechnology, mobile labs, and engaging STEM experiences.',
    primaryBtnText: 'Book for Your School',
    primaryBtnLink: '#inquiry-form',
    secondaryBtnText: 'Explore Offerings',
    secondaryBtnLink: '.categories-section',
    imageUrl: '/herosec.png',
    order: 1,
    isActive: true
  },
  {
    page: 'for-schools',
    eyebrow: 'NEXT-GEN STEM EDUCATION',
    headline: 'Science That Comes Alive in Classrooms',
    description: 'Empower students with real-world biology experiments, DNA extraction, and state-of-the-art scientific equipment.',
    primaryBtnText: 'Request a Workshop',
    primaryBtnLink: '#inquiry-form',
    secondaryBtnText: 'View Offerings',
    secondaryBtnLink: '.categories-section',
    imageUrl: '/main.png',
    order: 2,
    isActive: true
  },
  {
    page: 'for-schools',
    eyebrow: 'MEET SPARKY & THE TEAM',
    headline: 'Inspire the Next Generation of Scientists',
    description: 'Our expert mentors and friendly mascots bring excitement, curiosity, and deep discovery to every school event.',
    primaryBtnText: 'Schedule a Demo Day',
    primaryBtnLink: '#inquiry-form',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: '/contact',
    imageUrl: '/spark_character.png',
    order: 3,
    isActive: true
  },
  {
    page: 'for-schools',
    eyebrow: 'TAILORED SCHOOL CURRICULA',
    headline: 'Hands-on Bio Labs Built for Your Curriculum',
    description: 'Customized module packages designed for IGCSE, IB, American Diploma, and National STEM standards.',
    primaryBtnText: 'Get Custom Curriculum',
    primaryBtnLink: '#inquiry-form',
    secondaryBtnText: 'See All Programs',
    secondaryBtnLink: '.categories-section',
    imageUrl: '/About.png',
    order: 4,
    isActive: true
  },

  // About Page Carousel Slides
  {
    page: 'about',
    eyebrow: 'ABOUT BIOSPARK',
    headline: 'Inspiring the Next Generation of Scientists',
    description: 'We bring biotechnology to life through hands-on learning, curiosity, and innovation.',
    primaryBtnText: 'Our Mission',
    primaryBtnLink: '#who-we-are',
    secondaryBtnText: 'Meet The Team',
    secondaryBtnLink: '#board-members',
    imageUrl: '/About.png',
    order: 1,
    isActive: true
  },
  {
    page: 'about',
    eyebrow: 'HANDS-ON BIOTECH',
    headline: 'Empowering Students with Real Science Experience',
    description: 'Authentic DNA extraction, PCR amplification, and gel electrophoresis right in your classroom.',
    primaryBtnText: 'Explore Workshops',
    primaryBtnLink: '/workshops',
    secondaryBtnText: 'For Schools',
    secondaryBtnLink: '/for-schools',
    imageUrl: '/spark_character.png',
    order: 2,
    isActive: true
  },
  {
    page: 'about',
    eyebrow: 'FOR SCHOOLS & STEM',
    headline: 'Bringing Mobile Labs Directly to Your Campus',
    description: 'State-of-the-art portable biological laboratories designed for K-12 educational excellence.',
    primaryBtnText: 'For Schools',
    primaryBtnLink: '/for-schools',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: '/contact',
    imageUrl: '/herosec.png',
    order: 3,
    isActive: true
  },

  // Camps Page Carousel Slides
  {
    page: 'camps',
    eyebrow: 'SUMMER & SEASONAL CAMPS',
    headline: 'BioSpark Immersive Scientific Camps',
    description: 'Unforgettable hands-on STEM camps filled with real laboratory discoveries, genetic experiments, and scientific fun.',
    primaryBtnText: 'Register via WhatsApp',
    primaryBtnLink: '#whatsapp-register',
    secondaryBtnText: 'Explore Camps',
    secondaryBtnLink: '.camps-grid-section',
    imageUrl: '/main.png',
    order: 1,
    isActive: true
  },
  {
    page: 'camps',
    eyebrow: 'FUTURE BIOTECHNOLOGISTS',
    headline: 'Extract DNA & Build Biological Models',
    description: 'Students learn synthetic biology, micro-pipetting, and bio-engineering in a collaborative team environment.',
    primaryBtnText: 'Join a Camp',
    primaryBtnLink: '#camps-grid',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: '/contact',
    imageUrl: '/spark_character.png',
    order: 2,
    isActive: true
  },

  // Workshops Page Carousel Slides
  {
    page: 'workshops',
    eyebrow: 'HANDS-ON LAB WORKSHOPS',
    headline: 'Interactive Biotechnology Workshops',
    description: 'Practical, curriculum-aligned lab sessions for students from Grade 6 to Grade 12.',
    primaryBtnText: 'Explore Workshops',
    primaryBtnLink: '#workshops-grid',
    secondaryBtnText: 'Request Custom Session',
    secondaryBtnLink: '/for-schools',
    imageUrl: '/herosec.png',
    order: 1,
    isActive: true
  },
  {
    page: 'workshops',
    eyebrow: 'GRADE 6 TO 12 CURRICULUM',
    headline: 'State-of-the-Art Laboratory Tools',
    description: 'Experience real scientific centrifuges, gel electrophoresis, and fluorescence imaging.',
    primaryBtnText: 'Book Workshop',
    primaryBtnLink: '#workshops-grid',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: '/contact',
    imageUrl: '/main.png',
    order: 2,
    isActive: true
  }
];

const seedCarousels = async () => {
  try {
    await connectDB();
    const count = await CarouselSlide.countDocuments();
    if (count === 0) {
      await CarouselSlide.insertMany(defaultSlides);
      console.log('✅ Successfully seeded default carousel slides for all pages!');
    } else {
      console.log(`ℹ️ Carousel slides already exist (${count} slides). Skipping seed.`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding carousels:', err);
    process.exit(1);
  }
};

seedCarousels();
