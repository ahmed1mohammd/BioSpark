import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import SiteContent from './models/SiteContent.js';
import Program from './models/Program.js';
import Workshop from './models/Workshop.js';
import Camp from './models/Camp.js';
import Product from './models/Product.js';
import Gallery from './models/Gallery.js';
import Testimonial from './models/Testimonial.js';
import SchoolInquiry from './models/SchoolInquiry.js';
import ContactSubmission from './models/ContactSubmission.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing database collections...');
    await User.deleteMany();
    await SiteContent.deleteMany();
    await Program.deleteMany();
    await Workshop.deleteMany();
    await Camp.deleteMany();
    await Product.deleteMany();
    await Gallery.deleteMany();
    await Testimonial.deleteMany();
    await SchoolInquiry.deleteMany();
    await ContactSubmission.deleteMany();

    console.log('👤 Seeding Admin User...');
    const adminUser = await User.create({
      name: 'BioSpark Admin',
      email: 'admin@biospark.com',
      password: 'admin123456',
      role: 'admin',
      status: 'active',
      isSuperAdmin: true
    });
    console.log(`✅ Admin created: admin@biospark.com (Password: admin123456)`);

    console.log('🌐 Seeding Site Content...');
    await SiteContent.create({
      key: 'main_content',
      hero: {
        title: 'Biology, Brought to Life',
        subtitle: 'Transforming biotechnology and biology education into engaging, practical experiences.',
        description: 'BioSpark brings state-of-the-art biological laboratory experiences, interactive 3D models, and mobile labs directly to schools, students, and curious minds.',
        primaryCtaText: 'Explore Workshops',
        primaryCtaLink: '/workshops',
        secondaryCtaText: 'Bring to Your School',
        secondaryCtaLink: '/for-schools',
        heroImageUrl: '/herosec.png'
      },
      whoIsBioSparkFor: {
        title: 'Who is BioSpark for?',
        cards: [
          {
            id: 'schools',
            title: 'Schools & Educational Institutions',
            description: 'Hands-on laboratory sessions and mobile lab experiences designed to enhance K-12 science curricula.',
            ctaText: 'Explore School Programs',
            ctaLink: '/for-schools',
            icon: 'Building2'
          },
          {
            id: 'parents',
            title: 'Parents & Students',
            description: 'Engaging summer camps, weekend workshops, and educational kits that ignite curiosity in life sciences.',
            ctaText: 'Join a Camp',
            ctaLink: '/camps',
            icon: 'Users'
          },
          {
            id: 'organizations',
            title: 'Organizations & STEM Centers',
            description: 'Customized biotechnology exhibitions, science day events, and corporate educational social initiatives.',
            ctaText: 'Partner With Us',
            ctaLink: '/contact',
            icon: 'Award'
          }
        ]
      },
      whyBioSpark: {
        title: 'Why BioSpark?',
        features: [
          {
            title: 'Hands-on Learning',
            description: 'Students conduct real experiments using professional micropipettes, gel electrophoresis, and PCR equipment.',
            icon: 'FlaskConical'
          },
          {
            title: 'Real Scientific Experience',
            description: 'Curricula developed by experienced biotechnologists and molecular biology educators.',
            icon: 'Dna'
          },
          {
            title: 'Interactive 3D Visualizations',
            description: 'Cutting-edge 3D biological models that transform complex cellular concepts into tangible understanding.',
            icon: 'Box'
          },
          {
            title: 'Expert-Led Instruction',
            description: 'Qualified science mentors guiding students through every safety protocol and scientific principle.',
            icon: 'GraduationCap'
          }
        ]
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          { stepNumber: 1, title: 'Choose a Program', description: 'Select from our school workshops, mobile lab sessions, or scientific camps.' },
          { stepNumber: 2, title: 'Contact BioSpark', description: 'Submit your institution inquiry with preferred dates and student count.' },
          { stepNumber: 3, title: 'Customize Experience', description: 'We tailor experiments and theoretical modules to your specific grade levels.' },
          { stepNumber: 4, title: 'BioSpark Mobile Lab Arrives', description: 'Our team arrives with full laboratory equipment and safety gear.' },
          { stepNumber: 5, title: 'Students Experience Real Science', description: 'Students extract DNA, analyze genes, and experience authentic biotech discoveries!' }
        ]
      },
      ctaBanner: {
        title: 'Bring BioSpark to Your School',
        description: 'Transform your school science department into a high-tech biotechnology learning environment.',
        buttonText: 'Request School Inquiry',
        buttonLink: '/for-schools'
      },
      about: {
        title: 'About BioSpark',
        story: 'BioSpark was established to bridge the gap between textbook biology and real-world biotechnology experimentation. By bringing mobile laboratories and hands-on kits to classrooms, we spark scientific passion in youth.',
        mission: 'To empower students and educators across the region with practical biotechnology education and inspiring STEM experiences.',
        vision: 'To build a future where every student experiences the joy of scientific discovery firsthand.'
      },
      contactInfo: {
        email: 'info@biospark.com',
        phone: '+20 100 123 4567',
        address: 'Cairo, Egypt',
        socials: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com',
          whatsapp: 'https://wa.me/201001234567'
        }
      }
    });

    console.log('🎒 Seeding Programs...');
    await Program.create([
      {
        title: 'School Workshops',
        slug: 'school-workshops',
        category: 'School Workshops',
        shortDescription: 'Interactive single or multi-day hands-on biology workshops held directly at schools.',
        fullDescription: 'Customized for middle and high school students, featuring DNA extraction, micropipetting, and microscopic cell observation.',
        imageUrl: '/main.png',
        icon: 'FlaskConical',
        ordering: 1,
        active: true,
        featured: true
      },
      {
        title: 'Mobile Bio Lab',
        slug: 'mobile-bio-lab',
        category: 'Mobile Lab',
        shortDescription: 'BioSpark brings a complete portable biotechnology laboratory directly to your school campus.',
        fullDescription: 'Equipped with centrifuges, gel electrophoresis tanks, UV transilluminators, and safety equipment for 30 students.',
        imageUrl: '/spark_character.png',
        icon: 'Truck',
        ordering: 2,
        active: true,
        featured: true
      },
      {
        title: 'Science Days & Exhibitions',
        slug: 'science-days',
        category: 'Science Days',
        shortDescription: 'Large-scale scientific interactive booths and live demonstrations for annual school science fairs.',
        fullDescription: 'Engaging live biology demonstrations, 3D molecular modeling stations, and quick hands-on experiments.',
        imageUrl: '/herosec.png',
        icon: 'Sparkles',
        ordering: 3,
        active: true,
        featured: true
      },
      {
        title: 'Custom Curricula Programs',
        slug: 'custom-programs',
        category: 'Custom Programs',
        shortDescription: 'Long-term tailored biotechnology modules matching specific national or international STEM standards.',
        fullDescription: 'Designed collaboratively with school curriculum heads for IGCSE, IB, SAT Biology, or national curricula.',
        imageUrl: '/About.png',
        icon: 'BookOpen',
        ordering: 4,
        active: true,
        featured: true
      }
    ]);

    console.log('🧪 Seeding Workshops...');
    await Workshop.create([
      {
        title: 'Genetics & DNA Fingerprinting',
        slug: 'genetics-dna-fingerprinting',
        category: 'Genetics',
        shortDescription: 'Extract genomic DNA and simulate forensic DNA electrophoresis analysis.',
        fullDescription: 'Students learn cell lysis, DNA precipitation, micropipetting techniques, and how gel electrophoresis separates DNA fragments by size to solve a simulated forensic puzzle.',
        ageGroup: 'Grades 8 - 12 (Ages 13-18)',
        duration: '2.5 Hours',
        capacity: '24 Students',
        learningObjectives: [
          'Master micropipetting precision',
          'Understand DNA structure and cell extraction chemistry',
          'Analyze agarose gel electrophoresis patterns'
        ],
        activities: [
          'Strawberry/Cheek Cell DNA Extraction',
          'Gel Electrophoresis Loading & Running',
          'UV Transillumination DNA Band Analysis'
        ],
        imageUrl: '/main.png',
        active: true,
        featured: true,
        ordering: 1
      },
      {
        title: 'Microbiology & Bacterial Transformation',
        slug: 'microbiology-bacterial-transformation',
        category: 'Microbiology',
        shortDescription: 'Introduce green fluorescent protein (GFP) gene into E. coli cells.',
        fullDescription: 'Explore genetic engineering fundamentals by inserting a fluorescent jellyfish gene into bacterial plasmids and observing transformed bioluminescent colonies under UV light.',
        ageGroup: 'Grades 9 - 12 (Ages 14-18)',
        duration: '3 Hours',
        capacity: '20 Students',
        learningObjectives: [
          'Learn aseptic culturing techniques',
          'Grasp heat-shock transformation mechanisms',
          'Observe gene expression and antibiotic selection'
        ],
        activities: [
          'Preparation of Competent Cells',
          'Plasmid DNA Heat Shock',
          'LB/Ampicillin Agar Plate Inoculation'
        ],
        imageUrl: '/spark_character.png',
        active: true,
        featured: true,
        ordering: 2
      },
      {
        title: 'Enzyme Kinetics & Cellular Respiration',
        slug: 'enzyme-kinetics-cellular-respiration',
        category: 'Biotechnology',
        shortDescription: 'Measure catalase enzyme reaction rates under varying pH and temperature conditions.',
        fullDescription: 'An interactive biochemistry lab measuring substrate conversion speeds, enzyme denaturation, and industrial fermentation applications.',
        ageGroup: 'Grades 7 - 10 (Ages 12-16)',
        duration: '2 Hours',
        capacity: '30 Students',
        learningObjectives: [
          'Understand enzyme-substrate specificity',
          'Plot reaction velocity curves',
          'Evaluate environmental impacts on proteins'
        ],
        activities: [
          'Yeast Fermentation Gas Capture',
          'Catalase Oxygen Generation Trial',
          'Data Graphing & Analysis'
        ],
        imageUrl: '/herosec.png',
        active: true,
        featured: true,
        ordering: 3
      },
      {
        title: 'Human Physiology & Cardiovascular Modeling',
        slug: 'human-physiology-cardiovascular',
        category: 'Human Body',
        shortDescription: 'Hands-on dissection and micro-sensor monitoring of mammalian heart structures.',
        fullDescription: 'Discover human cardiac anatomy through comparative heart dissections, pulse sensor data collection, and simulated artificial valve engineering.',
        ageGroup: 'Grades 6 - 9 (Ages 11-15)',
        duration: '2 Hours',
        capacity: '25 Students',
        learningObjectives: [
          'Identify chambers, valves, and major blood vessels',
          'Measure heart rate response to exertion',
          'Connect anatomy with bioengineering solutions'
        ],
        activities: [
          'Guided Mammalian Organ Dissection',
          'Digital Pulse Sensor Monitoring',
          '3D Heart Structure Exploration'
        ],
        imageUrl: '/About.png',
        active: true,
        featured: true,
        ordering: 4
      }
    ]);

    console.log('🏕️ Seeding Camps...');
    await Camp.create([
      {
        title: 'Junior Scientists Summer Bio Camp',
        slug: 'junior-scientists-summer-camp',
        category: 'Junior Scientists',
        description: 'A fun 5-day adventure introducing young minds to microscopy, plants, and basic genetics.',
        ageRange: 'Ages 8 - 11',
        duration: '5 Days (9 AM - 1 PM daily)',
        dates: 'July 12 - July 16, 2026',
        location: 'BioSpark Science Innovation Hub',
        activities: [
          'Build Your Own DIY Microscope',
          'Plant Pigment Chromatography',
          'Edible DNA Double Helix Models',
          'Microorganism Safari under Lens'
        ],
        imageUrl: '/spark_character.png',
        price: 150,
        capacity: '15 Students',
        active: true,
        featured: true,
        ordering: 1
      },
      {
        title: 'Young Scientists Biotech Explorer Camp',
        slug: 'young-scientists-biotech-explorer',
        category: 'Young Scientists',
        description: 'Immersive hands-on camp covering DNA sequencing concepts, CRISPR, and synthetic biology basics.',
        ageRange: 'Ages 12 - 15',
        duration: '5 Days (10 AM - 3 PM daily)',
        dates: 'August 2 - August 6, 2026',
        location: 'BioSpark STEM Campus',
        activities: [
          'DNA Extraction & PCR Amplification',
          'Bacterial Transformation (Glow-in-the-dark E. coli)',
          '3D Protein Folding Workshop',
          'Bio-Entrepreneurship Project Challenge'
        ],
        imageUrl: '/main.png',
        price: 250,
        capacity: '20 Students',
        active: true,
        featured: true,
        ordering: 2
      },
      {
        title: 'Future Biotechnologists Intensive Bootcamp',
        slug: 'future-biotechnologists-bootcamp',
        category: 'Future Biotechnologists',
        description: 'Advanced pre-university lab bootcamp for high school students preparing for biology or medical degrees.',
        ageRange: 'Ages 16 - 19',
        duration: '10 Days (Full Day)',
        dates: 'August 16 - August 27, 2026',
        location: 'BioSpark Research Laboratory Center',
        activities: [
          'Advanced Gel Electrophoresis & PCR Assay',
          'Bioinformatics & Gene Sequence Alignment',
          'Cell Culture & Viability Assays',
          'Research Paper & Scientific Poster Presentation'
        ],
        imageUrl: '/herosec.png',
        price: 400,
        capacity: '12 Students',
        active: true,
        featured: true,
        ordering: 3
      }
    ]);

    console.log('🛒 Seeding Shop Products...');
    await Product.create([
      {
        title: 'BioSpark 3D DNA Double Helix Model Kit',
        slug: '3d-dna-double-helix-model-kit',
        category: '3D Models',
        shortDescription: 'Color-coded molecular assembly model demonstrating base pairing and double helix curvature.',
        description: 'Ideal for classroom demonstrations and student desk study. Includes adenine, thymine, cytosine, guanine, sugar-phosphate backbones, and stand.',
        imageUrl: '/main.png',
        price: 35,
        salePrice: 29,
        stockStatus: 'In Stock',
        sku: 'BSP-3D-DNA-01',
        specifications: [
          { key: 'Material', value: 'High-density non-toxic polymer' },
          { key: 'Height', value: '32 cm' },
          { key: 'Pieces', value: '64 interlocking molecular components' }
        ],
        active: true,
        featured: true,
        ordering: 1
      },
      {
        title: 'Hands-on Plant & Animal Cell 3D Puzzle',
        slug: 'plant-animal-cell-3d-puzzle',
        category: '3D Models',
        shortDescription: 'Cross-section 3D organelle model featuring nucleus, mitochondria, ER, and chloroplasts.',
        description: 'A tactile, color-differentiated educational puzzle allowing students to assemble and identify cell organelles independently.',
        imageUrl: '/About.png',
        price: 45,
        salePrice: 39,
        stockStatus: 'In Stock',
        sku: 'BSP-3D-CELL-02',
        specifications: [
          { key: 'Age Suitability', value: 'Grades 5+' },
          { key: 'Includes', value: 'Organelle guide manual & 3D base' }
        ],
        active: true,
        featured: true,
        ordering: 2
      },
      {
        title: 'Home & Classroom DNA Extraction Experiment Kit',
        slug: 'home-classroom-dna-extraction-kit',
        category: 'Educational Kits',
        shortDescription: 'Complete kit to extract real genomic DNA from fruits or saliva safely at home or in class.',
        description: 'Contains lysis buffer, ethanol vials, micro tubes, plastic pipettes, safety goggles, and step-by-step illustrated manual for 10 experiments.',
        imageUrl: '/herosec.png',
        price: 25,
        salePrice: 20,
        stockStatus: 'In Stock',
        sku: 'BSP-KIT-DNA-03',
        specifications: [
          { key: 'Reagents Included', value: 'Lysis buffer, precipitating enzyme' },
          { key: 'Capacity', value: '10 Complete Extractions' }
        ],
        active: true,
        featured: true,
        ordering: 3
      },
      {
        title: 'BioSpark Official Student Lab Coat & Safety Glasses Set',
        slug: 'biospark-lab-coat-safety-glasses',
        category: 'Merchandise',
        shortDescription: 'High quality embroidered BioSpark white lab coat with protective UV/impact safety goggles.',
        description: 'Instill scientific pride with authentic BioSpark branded lab coats tailored for kids, teens, and educators.',
        imageUrl: '/spark_character.png',
        price: 30,
        salePrice: 25,
        stockStatus: 'In Stock',
        sku: 'BSP-MERCH-COAT-04',
        specifications: [
          { key: 'Sizes', value: 'S (Kids), M (Teens), L (Adults)' },
          { key: 'Material', value: '65% Cotton, 35% Polyester' }
        ],
        active: true,
        featured: true,
        ordering: 4
      }
    ]);

    console.log('🖼️ Seeding Gallery Items...');
    await Gallery.create([
      {
        title: 'High School DNA Electrophoresis Lab',
        description: 'Students preparing gel loading samples using micropipettes during BioSpark Mobile Lab visit.',
        imageUrl: '/main.png',
        category: 'Workshops',
        featured: true,
        ordering: 1,
        active: true
      },
      {
        title: 'Mobile Bio Lab Setup',
        description: 'BioSpark mobile equipment ready for 30 students at St. George International School.',
        imageUrl: '/spark_character.png',
        category: 'Mobile Lab',
        featured: true,
        ordering: 2,
        active: true
      },
      {
        title: 'Interactive Science Day Booth',
        description: 'Young visitors observing living microorganism cultures through BioSpark digital microscopes.',
        imageUrl: '/herosec.png',
        category: 'Science Days',
        featured: true,
        ordering: 3,
        active: true
      },
      {
        title: 'Summer Biotech Camp Certificate Ceremony',
        description: 'Junior Scientists showing off their glowing transformed bacterial culture plates.',
        imageUrl: '/About.png',
        category: 'Camps',
        featured: true,
        ordering: 4,
        active: true
      }
    ]);

    console.log('💬 Seeding Testimonials...');
    await Testimonial.create([
      {
        name: 'Dr. Sarah El-Sayed',
        role: 'Head of Science Department',
        organization: 'Cairo International STEM School',
        content: 'BioSpark transformed our biology class. The mobile lab brought equipment our school could never afford to purchase permanently. Our students extracted DNA and were thrilled!',
        avatarUrl: '/spark_character.png',
        rating: 5,
        featured: true,
        active: true,
        ordering: 1
      },
      {
        name: 'Eng. Mahmoud Hassan',
        role: 'Parent',
        organization: 'Young Scientist Camp 2025',
        content: 'My 13-year-old daughter joined the Young Scientists camp and couldn’t stop talking about gene editing and bacteria! BioSpark ignited a genuine passion for medicine and biotech in her.',
        avatarUrl: '/main.png',
        rating: 5,
        featured: true,
        active: true,
        ordering: 2
      },
      {
        name: 'Prof. Ahmed Mansour',
        role: 'Education Consultant',
        organization: 'National STEM Initiative',
        content: 'BioSpark’s 3D models and practical approach turn complex, abstract biology concepts into intuitive, exciting discoveries. Highly recommended for every school.',
        avatarUrl: '/About.png',
        rating: 5,
        featured: true,
        active: true,
        ordering: 3
      }
    ]);

    console.log('📬 Seeding Sample Inquiries...');
    await SchoolInquiry.create({
      schoolName: 'Green Valley International Academy',
      contactPerson: 'Mona Zaki',
      email: 'mona.zaki@greenvalley.edu',
      phone: '+20 122 987 6543',
      studentCount: '80-100',
      studentGrade: 'Grades 9 & 10',
      interestedProgram: 'Mobile Bio Lab',
      preferredDate: '2026-10-15',
      message: 'We would like to book a 2-day Mobile Lab for our IGCSE Biology students focused on Genetics & Electrophoresis.',
      status: 'New'
    });

    await ContactSubmission.create({
      name: 'Youssef Ali',
      email: 'youssef.ali@gmail.com',
      phone: '+20 101 234 5678',
      subject: 'Inquiry regarding 3D DNA Model Kits for private tutoring',
      message: 'Hello BioSpark team, I am interested in purchasing 5 units of the 3D DNA model kit. Do you deliver in Giza?',
      status: 'New'
    });

    console.log('✨ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
