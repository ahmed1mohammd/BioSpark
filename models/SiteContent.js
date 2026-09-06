import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main_content'
  },
  hero: {
    title: { type: String, default: 'Biology, Brought to Life' },
    subtitle: { type: String, default: 'Transforming biotechnology and biology education into engaging, practical experiences.' },
    description: { type: String, default: 'BioSpark brings state-of-the-art biological laboratory experiences directly to schools, students, and curious minds.' },
    primaryCtaText: { type: String, default: 'Explore Programs' },
    primaryCtaLink: { type: String, default: '/workshops' },
    secondaryCtaText: { type: String, default: 'Bring to Your School' },
    secondaryCtaLink: { type: String, default: '/for-schools' },
    heroImageUrl: { type: String, default: '/herosec.png' }
  },
  whoIsBioSparkFor: {
    title: { type: String, default: 'Who is BioSpark for?' },
    cards: [
      {
        id: { type: String, default: 'schools' },
        title: { type: String, default: 'Schools' },
        description: { type: String, default: 'Educational programs designed for schools and educational institutions seeking hands-on bio labs.' },
        ctaText: { type: String, default: 'For Schools' },
        ctaLink: { type: String, default: '/for-schools' },
        icon: { type: String, default: 'Building2' }
      },
      {
        id: { type: String, default: 'parents' },
        title: { type: String, default: 'Parents & Students' },
        description: { type: String, default: 'Hands-on educational experiences and camps that make science engaging, fun, and clear.' },
        ctaText: { type: String, default: 'Explore Camps' },
        ctaLink: { type: String, default: '/camps' },
        icon: { type: String, default: 'Users' }
      },
      {
        id: { type: String, default: 'organizations' },
        title: { type: String, default: 'Organizations' },
        description: { type: String, default: 'Customized scientific education programs and experiences for organizations and science centers.' },
        ctaText: { type: String, default: 'Contact Us' },
        ctaLink: { type: String, default: '/contact' },
        icon: { type: String, default: 'Award' }
      }
    ]
  },
  whyBioSpark: {
    title: { type: String, default: 'Why BioSpark?' },
    features: [
      {
        title: { type: String, default: 'Hands-on Learning' },
        description: { type: String, default: 'Students perform real laboratory experiments using authentic biotechnology tools.' },
        icon: { type: String, default: 'FlaskConical' }
      },
      {
        title: { type: String, default: 'Real Scientific Experience' },
        description: { type: String, default: 'Curriculum designed by biotech researchers and experienced educators.' },
        icon: { type: String, default: 'Dna' }
      },
      {
        title: { type: String, default: '3D & Interactive Models' },
        description: { type: String, default: 'Visual 3D molecular representations that simplify complex biological structures.' },
        icon: { type: String, default: 'Box' }
      },
      {
        title: { type: String, default: 'Expert-Led Workshops' },
        description: { type: String, default: 'Instructors specialized in molecular biology, genetics, and biotechnology.' },
        icon: { type: String, default: 'GraduationCap' }
      }
    ]
  },
  howItWorks: {
    title: { type: String, default: 'How It Works' },
    steps: [
      {
        stepNumber: { type: Number, default: 1 },
        title: { type: String, default: 'Choose a Program' },
        description: { type: String, default: 'Select from our school workshops, mobile lab sessions, or customized camps.' }
      },
      {
        stepNumber: { type: Number, default: 2 },
        title: { type: String, default: 'Contact BioSpark' },
        description: { type: String, default: 'Fill out our quick inquiry form with your school or group requirements.' }
      },
      {
        stepNumber: { type: Number, default: 3 },
        title: { type: String, default: 'Customize Experience' },
        description: { type: String, default: 'We adapt our experiments to fit your curriculum and student age group.' }
      },
      {
        stepNumber: { type: Number, default: 4 },
        title: { type: String, default: 'BioSpark Comes to You' },
        description: { type: String, default: 'Our mobile lab team arrives equipped with all scientific tools and safety equipment.' }
      },
      {
        stepNumber: { type: Number, default: 5 },
        title: { type: String, default: 'Students Experience Science' },
        description: { type: String, default: 'Students perform DNA extractions, PCR tests, and biotech experiments firsthand!' }
      }
    ]
  },
  ctaBanner: {
    title: { type: String, default: 'Bring BioSpark to Your School' },
    description: { type: String, default: 'Transform science education in your classroom with our mobile biotechnology laboratories and specialized workshops.' },
    buttonText: { type: String, default: 'Request School Program' },
    buttonLink: { type: String, default: '/for-schools' }
  },
  about: {
    title: { type: String, default: 'About BioSpark' },
    story: { type: String, default: 'BioSpark was founded with a mission to revolutionize biotechnology education. We bridge the gap between theoretical science and practical experimentation.' },
    mission: { type: String, default: 'To empower the next generation of scientists by delivering world-class, accessible biotechnology education to schools and students everywhere.' },
    vision: { type: String, default: 'To create a world where every young mind has direct hands-on access to the wonders of modern biological science.' }
  },
  contactInfo: {
    email: { type: String, default: 'info@biospark.com' },
    phone: { type: String, default: '+20 114 086 6774' },
    whatsappNumber: { type: String, default: '201140866774' },
    address: { type: String, default: 'Cairo, Egypt' },
    socials: {
      facebook: { type: String, default: 'https://facebook.com/biospark' },
      instagram: { type: String, default: 'https://instagram.com/biospark' },
      linkedin: { type: String, default: 'https://linkedin.com/company/biospark' },
      whatsapp: { type: String, default: 'https://wa.me/201140866774' }
    }
  }
}, { timestamps: true });

export default mongoose.model('SiteContent', siteContentSchema);
