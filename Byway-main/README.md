# Byway — Frontend

React-based frontend for the Byway online learning platform.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Redux Toolkit + React Redux | State management |
| MUI v7 | UI component library |
| Axios | HTTP client |
| Framer Motion | Animations |
| Emotion | CSS-in-JS styling |
| Tailwind Merge | Utility class merging |

---

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running on `http://localhost:5000` (see `Bywaybackend-main`)

### Install & Run

```bash
cd Byway-main
npm install
npm start
```

The app runs at: `http://localhost:3000`

---

## Project Structure

```
src/
├── App.js                    # Routes & layout
├── index.js                  # Entry point
├── store.js                  # Redux store configuration
├── components/
│   ├── wrappedcomponent/     # Layout components (Header, Footer)
│   ├── singlecomponent/      # Individual UI components (Login, Signup, Cards)
│   ├── internalcomponent/    # Composite sections (Hero, Top courses)
│   └── styledcomponent/      # Reusable styled elements (Loading, Animations)
├── pages/                    # Page-level components
├── slice/                    # Redux slices
├── lib/                      # Utilities (utils.js)
├── data/                     # Mock data (mockData.js)
└── Asstes/                   # Static assets (images, SVGs)
```

---

## Routes

| Route | Page Component |
|---|---|
| `/` | Landing |
| `/auth` | Authenticate (Sign In / Sign Up) |
| `/category` | Category |
| `/course` | Course |
| `/indiviualcourse` | Individual Course Details |
| `/shopingcart` | Shopping Cart |
| `/instructor` | Instructor Profile |
| `/user` | User Profile |
| `/whisliste` | Wishlist |
| `/indiviualmessage` | Messages |
| `/payment` | Payment Page |

---

## State Management (Redux)

| Slice | Purpose |
|---|---|
| `userdetail` | Stores user information |
| `userlearn` | Tracks courses the user is learning |

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:5000` | Backend API base URL |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |
