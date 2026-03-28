# Byway — Backend

Express + MongoDB backend API for the Byway online learning platform.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Express 5 | Web framework |
| Mongoose | MongoDB ODM |
| Multer | File uploads (images, videos) |
| CORS | Cross-origin support |
| dotenv | Environment variables |
| Puppeteer | PDF certificate generation |
| EJS | Certificate template engine |
| Nodemailer | Email service |
| QRCode | QR code generation for certificates |
| sanitize-html | HTML sanitization |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB v6+ running locally on port `27017`

### Install & Run

```bash
cd Bywaybackend-main
npm install

# Development (auto-restarts on changes)
npm run dev

# Production
npm start
```

The server runs at: `http://localhost:5000`

### Seed the Database

Run once to populate sample data:

```bash
node seed.js
```

This inserts 3 instructors, 6 courses, syllabuses, and a test user (`testuser` / `test1234`).

> **Warning:** Running `seed.js` clears all existing data.

---

## Project Structure

```
Bywaybackend-main/
├── index.js                # Main server entry point
├── db.js                   # MongoDB connection
├── seed.js                 # Database seeder
├── models/
│   ├── coursemodel/        # Course schemas
│   ├── Instructormodel/    # Instructor schemas
│   ├── usermodel/          # User schemas
│   └── review/             # Review schemas
├── routes/
│   ├── course/             # Course management routes
│   ├── instructor/         # Instructor routes
│   ├── user/               # Auth & profile routes
│   ├── payment/            # Payment integration
│   └── review/             # Review/rating routes
├── views/                  # EJS templates (certificates)
├── coursethumbnail/        # Course thumbnail storage
├── coursevideo/            # Course video storage
├── instructorprofile/      # Instructor image storage
└── userprofile/            # User profile images & signatures
```

---

## API Endpoints

### User — `/user/*`

User registration, login, profile management, cart, and wishlist.

### Course — `/course/*`

| Method | Purpose |
|---|---|
| POST | Add courses |
| GET | Fetch course details |

### Syllabus — `/syllabus/*`

| Method | Purpose |
|---|---|
| POST | Add course content |
| GET | Fetch syllabus |

### Instructor — `/instructor/*`

| Method | Purpose |
|---|---|
| POST | Instructor profile management |
| GET | Fetch instructor details and courses taught |

### Learning — `/learning/*`

Track user course progress and mark videos as viewed.

### Cart — `/cart/*`

Fetch cart items for a user.

### Messaging — `/message/*` and `/instructormess/*`

User-instructor messaging system.

### Reviews — `/review/*`

| Method | Purpose |
|---|---|
| POST | Submit a review |
| GET | Fetch course reviews |

### Payment — `/payment/*`

Payment processing via Cashfree gateway.

### Certificate — `/certificate/generate`

Generate PDF course completion certificates with QR codes.

---

## Models

| Model | Purpose |
|---|---|
| **userlogin** | User credentials, cart, wishlist, notifications, reviews |
| **indiviualprofile** | User profile (headline, bio, languages, links, image) |
| **Indiviuallearning** | Course progress tracking (courses, lessons, completion) |
| **coursedetail** | Course info (title, price, rating, instructor, syllabus) |
| **coursesyllabus** | Course structure (sections, lessons, video content) |
| **instructordetail** | Instructor profile (name, experience, courses, ratings) |
| **coursescommonreview** | Reviews and ratings |
| **IndiviualMessage** | User messages from instructors |
| **InstructorMessage** | Instructor messages to users |
| **Counter** | Auto-increment counter for review IDs |

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/byway` | MongoDB connection string |
| `CASHFREE_APP_ID` | — | Cashfree payment gateway app ID |
| `CASHFREE_SECRET_KEY` | — | Cashfree payment gateway secret |

---

## File Upload Limits

| Type | Max Size |
|---|---|
| Images | 5 MB |
| Videos | 400 MB |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start server (`node index.js`) |
| `npm run dev` | Start with nodemon (auto-reload) |
