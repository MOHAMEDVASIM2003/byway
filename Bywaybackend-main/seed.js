const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const coursedetail = require('./models/coursemodel/coursedetail');
const coursesyllabus = require('./models/coursemodel/coursesyllab');
const instructordetail = require('./models/Instructormodel/instructordetail');
const coursecommonreview = require('./models/review/coursescommonreview');
const Counter = require('./models/review/counter');
const logindetail = require('./models/usermodel/userlogin');

// Minimal valid 1x1 placeholder PNG (gray)
const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

function createPlaceholders() {
  // Create directories if they don't exist
  ['instructorprofile', 'coursethumbnail'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  });

  console.log('✅ Image directories ready');
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const instructors = [
  {
    name: 'Alex Johnson',
    id: 'inst001',
    label: ['Web Development', 'JavaScript'],
    totalStudents: '12400',
    totalreview: '342',
    about: 'Alex is a full-stack web developer with over 10 years of experience building scalable web applications. He has worked with top-tier companies and loves sharing his knowledge.',
    areaofexperience: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    professionalexperience: '10 years of industry experience',
    courses: ['course001', 'course002'],
    image: 'teacher1.jpg'
  },
  {
    name: 'Priya Sharma',
    id: 'inst002',
    label: ['Data Science', 'Machine Learning'],
    totalStudents: '9800',
    totalreview: '278',
    about: 'Priya is a data scientist and AI researcher with a PhD in Computer Science. She specialises in machine learning and has published several papers in top conferences.',
    areaofexperience: ['Python', 'TensorFlow', 'Data Analysis', 'Deep Learning'],
    professionalexperience: '8 years in data science and AI research',
    courses: ['course003', 'course004'],
    image: 'teacher2.jpg'
  },
  {
    name: 'Marcus Lee',
    id: 'inst003',
    label: ['UI/UX Design', 'Figma'],
    totalStudents: '7200',
    totalreview: '195',
    about: 'Marcus is a senior UX designer who has worked with startups and Fortune 500 companies. He is passionate about user-centered design and accessibility.',
    areaofexperience: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    professionalexperience: '7 years designing products at scale',
    courses: ['course005', 'course006'],
    image: 'teacher3.jpg'
  }
];

const courses = [
  {
    category: 'Web Development',
    courseid: 'course001',
    coursename: 'Complete React Developer Course',
    instructorid: 'inst001',
    bannertext: 'Master React from beginner to advanced with real-world projects',
    description: 'Learn React from scratch and build production-ready applications. This comprehensive course covers hooks, context, Redux Toolkit, and modern React patterns used at top companies.',
    rating: 4.8,
    language: 'English',
    courseoverview: ['Build 5 real-world projects', 'Master React Hooks', 'Learn Redux Toolkit', 'Deploy to production'],
    keylearning: 'React, Hooks, Redux, React Router, Axios',
    price: '1999',
    totalbuy: 1240,
    coursethumbnail: 'react.jpg',
    totalreview: 342,
    totalrating: 1641
  },
  {
    category: 'Web Development',
    courseid: 'course002',
    coursename: 'Node.js & Express Backend Mastery',
    instructorid: 'inst001',
    bannertext: 'Build powerful REST APIs and server-side applications with Node.js',
    description: 'Become a backend developer with Node.js and Express. Learn REST API design, JWT authentication, MongoDB integration, and cloud deployment.',
    rating: 4.7,
    language: 'English',
    courseoverview: ['Build REST APIs from scratch', 'JWT Authentication', 'MongoDB with Mongoose', 'Deploy to cloud'],
    keylearning: 'Node.js, Express, MongoDB, REST API, JWT',
    price: '1799',
    totalbuy: 980,
    coursethumbnail: 'node.jpg',
    totalreview: 280,
    totalrating: 1316
  },
  {
    category: 'Data Science',
    courseid: 'course003',
    coursename: 'Python for Data Science & Machine Learning',
    instructorid: 'inst002',
    bannertext: 'Go from zero to Data Scientist with Python and real ML projects',
    description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow. Build real ML models and understand the theory behind them through hands-on projects.',
    rating: 4.9,
    language: 'English',
    courseoverview: ['Python fundamentals', 'Data manipulation with Pandas', 'ML algorithms', 'Deep learning basics'],
    keylearning: 'Python, Pandas, NumPy, Scikit-Learn, TensorFlow',
    price: '2499',
    totalbuy: 2100,
    coursethumbnail: 'python.jpg',
    totalreview: 512,
    totalrating: 2508
  },
  {
    category: 'Data Science',
    courseid: 'course004',
    coursename: 'Deep Learning with TensorFlow',
    instructorid: 'inst002',
    bannertext: 'Master Neural Networks, CNNs, RNNs and deploy AI models',
    description: 'Dive deep into neural networks, CNNs, RNNs, and transformers. Build AI applications from scratch using TensorFlow and Keras with real-world datasets.',
    rating: 4.8,
    language: 'English',
    courseoverview: ['Neural Networks foundations', 'Convolutional Networks for vision', 'NLP with transformers', 'Deploy AI models'],
    keylearning: 'TensorFlow, Keras, CNNs, RNNs, NLP',
    price: '2999',
    totalbuy: 870,
    coursethumbnail: 'deep learning.jpg',
    totalreview: 210,
    totalrating: 1008
  },
  {
    category: 'Design',
    courseid: 'course005',
    coursename: 'UI/UX Design with Figma',
    instructorid: 'inst003',
    bannertext: 'Design beautiful, user-friendly products from scratch with Figma',
    description: 'Learn UI/UX design principles and Figma from the ground up. Create wireframes, prototypes, and design systems used by top product teams at leading tech companies.',
    rating: 4.7,
    language: 'English',
    courseoverview: ['Design principles & color theory', 'Figma mastery', 'Prototyping & user testing', 'Design systems'],
    keylearning: 'Figma, UI Design, UX Research, Prototyping',
    price: '1499',
    totalbuy: 1560,
    coursethumbnail: 'uiux.jpg',
    totalreview: 390,
    totalrating: 1833
  },
  {
    category: 'Design',
    courseid: 'course006',
    coursename: 'Mobile App Design Masterclass',
    instructorid: 'inst003',
    bannertext: 'Design stunning iOS and Android apps users will love',
    description: 'Learn to design native mobile applications for iOS and Android. Cover mobile UX patterns, accessibility guidelines, and professional design handoff workflows.',
    rating: 4.6,
    language: 'English',
    courseoverview: ['Mobile UX patterns', 'iOS Human Interface Guidelines', 'Android Material Design', 'Design handoff with Zeplin'],
    keylearning: 'Mobile Design, iOS, Android, Figma, Zeplin',
    price: '1699',
    totalbuy: 740,
    coursethumbnail: 'mobile app.jpg',
    totalreview: 175,
    totalrating: 805
  }
];

const syllabuses = [
  {
    courseid: 'course001',
    totalduration: 3600,
    syllabus: [
      {
        section: 'Getting Started with React',
        lessons: [
          { lesson: 'What is React?', coursecontent: 'Introduction to React and why we use it in modern web dev', lessonduration: 600 },
          { lesson: 'Setting up the Environment', coursecontent: 'Installing Node.js, npm, and Create React App', lessonduration: 900 },
          { lesson: 'Your First React Component', coursecontent: 'Creating and rendering a simple React component', lessonduration: 1200 }
        ]
      },
      {
        section: 'React Hooks Deep Dive',
        lessons: [
          { lesson: 'useState Hook', coursecontent: 'Managing state in functional components with useState', lessonduration: 1200 },
          { lesson: 'useEffect Hook', coursecontent: 'Side effects and lifecycle methods in React', lessonduration: 1500 },
          { lesson: 'useContext Hook', coursecontent: 'Global state management with the Context API', lessonduration: 1200 }
        ]
      },
      {
        section: 'Redux Toolkit',
        lessons: [
          { lesson: 'Introduction to Redux', coursecontent: 'Why Redux exists and how the state machine works', lessonduration: 900 },
          { lesson: 'Creating Slices', coursecontent: 'Redux Toolkit createSlice and reducers', lessonduration: 1200 },
          { lesson: 'Async Thunks', coursecontent: 'Handling async operations with createAsyncThunk', lessonduration: 1500 }
        ]
      }
    ]
  },
  {
    courseid: 'course002',
    totalduration: 3000,
    syllabus: [
      {
        section: 'Node.js Fundamentals',
        lessons: [
          { lesson: 'Introduction to Node.js', coursecontent: 'What is Node.js and how the event loop works', lessonduration: 900 },
          { lesson: 'Modules and NPM', coursecontent: 'CommonJS modules and package management', lessonduration: 900 },
          { lesson: 'File System & Streams', coursecontent: 'Working with files, buffers and readable streams', lessonduration: 1200 }
        ]
      },
      {
        section: 'Express Framework',
        lessons: [
          { lesson: 'Setting up Express', coursecontent: 'Creating your first Express server and routing', lessonduration: 900 },
          { lesson: 'Middleware Pipeline', coursecontent: 'Request handling and custom middleware', lessonduration: 1200 },
          { lesson: 'REST API Design', coursecontent: 'CRUD operations and REST principles with MongoDB', lessonduration: 1500 }
        ]
      }
    ]
  },
  {
    courseid: 'course003',
    totalduration: 4200,
    syllabus: [
      {
        section: 'Python Basics',
        lessons: [
          { lesson: 'Python Syntax & Data Types', coursecontent: 'Variables, data types, loops and control flow', lessonduration: 1200 },
          { lesson: 'Functions and OOP', coursecontent: 'Functions, classes and object-oriented programming', lessonduration: 1500 }
        ]
      },
      {
        section: 'Data Analysis',
        lessons: [
          { lesson: 'NumPy Arrays', coursecontent: 'Working with numerical data using NumPy', lessonduration: 1200 },
          { lesson: 'Pandas DataFrames', coursecontent: 'Data manipulation and cleaning with Pandas', lessonduration: 1800 },
          { lesson: 'Data Visualization', coursecontent: 'Plotting with Matplotlib and Seaborn', lessonduration: 1200 }
        ]
      }
    ]
  },
  {
    courseid: 'course004',
    totalduration: 3800,
    syllabus: [
      {
        section: 'Neural Network Fundamentals',
        lessons: [
          { lesson: 'Perceptrons and Activation Functions', coursecontent: 'Understanding artificial neurons and activations', lessonduration: 1200 },
          { lesson: 'Backpropagation', coursecontent: 'How neural networks learn from errors', lessonduration: 1500 }
        ]
      },
      {
        section: 'Deep Learning Models',
        lessons: [
          { lesson: 'Convolutional Neural Networks', coursecontent: 'CNNs for image recognition and computer vision', lessonduration: 1800 },
          { lesson: 'Recurrent Neural Networks', coursecontent: 'RNNs and LSTMs for sequence data and NLP', lessonduration: 1500 }
        ]
      }
    ]
  },
  {
    courseid: 'course005',
    totalduration: 2800,
    syllabus: [
      {
        section: 'Design Fundamentals',
        lessons: [
          { lesson: 'Color Theory', coursecontent: 'Understanding color psychology and palette building', lessonduration: 900 },
          { lesson: 'Typography', coursecontent: 'Choosing and pairing fonts for readability', lessonduration: 900 },
          { lesson: 'Layout & Grid Systems', coursecontent: 'Using grids for consistent, balanced layouts', lessonduration: 1200 }
        ]
      },
      {
        section: 'Figma Mastery',
        lessons: [
          { lesson: 'Figma Basics', coursecontent: 'Navigating Figma interface and essential tools', lessonduration: 1200 },
          { lesson: 'Components & Variants', coursecontent: 'Building reusable design components and variants', lessonduration: 1500 }
        ]
      }
    ]
  },
  {
    courseid: 'course006',
    totalduration: 2400,
    syllabus: [
      {
        section: 'Mobile UX Principles',
        lessons: [
          { lesson: 'Mobile-first Design', coursecontent: 'Designing for small screens and progressive enhancement', lessonduration: 900 },
          { lesson: 'Touch & Gesture Interactions', coursecontent: 'Designing intuitive touch-based interactions', lessonduration: 900 }
        ]
      },
      {
        section: 'Platform Guidelines',
        lessons: [
          { lesson: 'iOS Human Interface Guidelines', coursecontent: 'Apple design principles, components and patterns', lessonduration: 1200 },
          { lesson: 'Android Material Design', coursecontent: 'Google material design system and components', lessonduration: 1200 }
        ]
      }
    ]
  }
];

const reviews = [
  {
    reviewid: 'rev001',
    holdername: 'john_doe',
    courseid: 'course001',
    review: 'Absolutely brilliant course! Alex explains everything so clearly. I went from knowing nothing about React to building full apps in weeks. Highly recommended!',
    rating: 5
  },
  {
    reviewid: 'rev002',
    holdername: 'sarah_m',
    courseid: 'course003',
    review: 'Priya is an amazing instructor. The data science course is well-structured and covers all the essential topics. The hands-on projects really helped me understand ML.',
    rating: 5
  },
  {
    reviewid: 'rev003',
    holdername: 'mike_t',
    courseid: 'course005',
    review: 'Great design course! Marcus has a wonderful teaching style and the Figma tutorials are very detailed. My design skills have improved dramatically.',
    rating: 4
  },
  {
    reviewid: 'rev004',
    holdername: 'lisa_k',
    courseid: 'course002',
    review: 'The Node.js course is very comprehensive. I learned so much about backend development. The REST API section was especially useful for my current job.',
    rating: 5
  },
  {
    reviewid: 'rev005',
    holdername: 'david_w',
    courseid: 'course004',
    review: 'Deep learning can be intimidating, but Priya makes it accessible. The TensorFlow examples are practical and the explanations are very clear.',
    rating: 4
  }
];

const sampleUser = {
  firstname: 'Test',
  lastname: 'User',
  username: 'testuser',
  email: 'test@example.com',
  password: 'test1234',
  carddata: ['course001'],
  whisliste: ['course003'],
  notification: [],
  myreview: []
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/byway');
    console.log('✅ Connected to MongoDB\n');

    createPlaceholders();

    // Clear existing data
    await Promise.all([
      coursedetail.deleteMany({}),
      coursesyllabus.deleteMany({}),
      instructordetail.deleteMany({}),
      coursecommonreview.deleteMany({}),
      Counter.deleteMany({}),
      logindetail.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data\n');

    await instructordetail.insertMany(instructors);
    console.log(`✅ Inserted ${instructors.length} instructors`);

    await coursedetail.insertMany(courses);
    console.log(`✅ Inserted ${courses.length} courses`);

    await coursesyllabus.insertMany(syllabuses);
    console.log(`✅ Inserted ${syllabuses.length} syllabuses`);

    await coursecommonreview.insertMany(reviews);
    console.log(`✅ Inserted ${reviews.length} reviews`);

    await logindetail.create(sampleUser);
    console.log('✅ Inserted sample user');

    await Counter.create({ _id: 'reviewid', seq: reviews.length });
    console.log('✅ Review counter initialized\n');

    console.log('🎉 Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('  Login → username: testuser');
    console.log('          password: test1234');
    console.log('─────────────────────────────────');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Auto-seed on every server start: always wipes and re-seeds
async function seedIfEmpty() {
  try {
    console.log('📦 Seeding database...\n');
    createPlaceholders();

    await Promise.all([
      coursedetail.deleteMany({}),
      coursesyllabus.deleteMany({}),
      instructordetail.deleteMany({}),
      coursecommonreview.deleteMany({}),
      Counter.deleteMany({}),
      logindetail.deleteMany({})
    ]);

    await instructordetail.insertMany(instructors);
    await coursedetail.insertMany(courses);
    await coursesyllabus.insertMany(syllabuses);
    await coursecommonreview.insertMany(reviews);
    await logindetail.create(sampleUser);
    await Counter.create({ _id: 'reviewid', seq: reviews.length });

    console.log('🎉 Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('  Login → username: testuser');
    console.log('          password: test1234');
    console.log('─────────────────────────────────\n');
  } catch (err) {
    console.error('❌ Auto-seed error:', err.message);
  }
}

module.exports = { seedIfEmpty };

// Allow running directly: node seed.js
if (require.main === module) {
  seed();
}
