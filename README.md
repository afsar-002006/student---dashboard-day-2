# Student Card Management System (StudentHub)

A modern, responsive, and intuitive web-based academic dashboard designed for managing student identification cards and student records efficiently. Built using **React.js**, **JavaScript**, **Vite**, and modular **CSS**.

---

## 1. Project Overview

The **Student Card Management System** provides educational institutions, faculty, and administrative staff with a streamlined digital portal to organize, search, filter, and maintain student identity records. Student information is presented as clean, professional academic profile cards featuring visual branding, contact information, department classification, academic progression (year and semester), and quick management actions.

The application leverages client-side storage (**Browser LocalStorage**) to ensure seamless persistence across page reloads without requiring complex database infrastructure for client-side operations.

---

## 2. Project Objectives

- **Digitize Student ID Management**: Eliminate paper-based or disjointed spreadsheet records with an interactive, unified student identity hub.
- **Component-Driven Architecture**: Demonstrate modern React best practices using modular, single-responsibility components and custom hooks (`useStudents`).
- **Interactive Data Controls**: Provide instant real-time search (by student name and register number) and department-based filtering.
- **Robust Data Operations (CRUD)**: Support comprehensive Create, Read, Update, and Delete operations with input validation and deletion confirmations.
- **Resilient UI Experience**: Gracefully handle missing or broken student photographs with dynamic initial-based avatars.
- **Fully Responsive Academic Dashboard**: Deliver an optimized, two-column layout on desktop/tablet devices and a single-column layout on mobile devices.

---

## 3. Key Features

### 🎓 Student Profile Cards
- Visual top accent in primary academic blue (`#2563EB`).
- Student profile photograph with automated fallback to student initials for missing or broken image URLs.
- Clear typography displaying student name, official badge, register number, department, academic year, semester, and email address.
- Interactive action buttons: **View Details**, **Edit**, and **Delete**.

### 🔍 Real-Time Search & Filtering
- Dynamic search filtering by **Student Name** or **Register Number**.
- Department dropdown filter dynamically populated from active student records.
- Live result counters reflecting both total database count and currently matched students.

### 📝 Form Management & Validation
- **Add Student Modal**: Register new students with client-side validation.
- **Edit Student Modal**: Modify existing student profiles with pre-filled inputs.
- Real-time field validation for:
  - Required fields (Name, Register Number, Department, Year, Semester, Email).
  - Register number uniqueness across all existing students.
  - Standard RFC 5322 email format validation.
  - Descriptive, inline error messages.

### 🛡️ Safe Deletion & Detail Inspection
- Confirmation modal before deleting any student record to avoid accidental data loss.
- Detailed student profile modal displaying expanded student credentials and contact information.

### 💾 LocalStorage Persistence
- Automatic synchronization with the browser's `localStorage`.
- Pre-loaded with realistic sample student data on initial load.
- Seamless data retention upon browser refresh or tab reopen.

---

## 4. Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Core Framework** | React 18 | Functional components, hooks (`useState`, `useEffect`, `useMemo`) |
| **Build Tool & Bundler** | Vite 6 | Ultra-fast Hot Module Replacement (HMR) and optimized build bundling |
| **Language** | JavaScript (ES6+) | Modern syntax, destructuring, array methods (`map`, `filter`, `some`) |
| **Styling** | Vanilla CSS3 | Custom properties (CSS variables), Flexbox, CSS Grid, media queries |
| **Persistence** | Web Storage API | Browser `localStorage` for offline state persistence |
| **Typography & Icons** | Inter & Google Fonts | High-legibility typography designed for user interfaces |

---

## 5. Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended; verified with v24.x)
- [npm](https://www.npmjs.com/) (v8.0 or higher)

### Step 1: Clone or Navigate to the Project Directory
```bash
cd "student-card"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```

Open your browser and navigate to the local URL displayed in your terminal (typically `http://localhost:5173/`).

---

## 6. Execution and Build

### Build for Production
To generate a production-ready, minified build:
```bash
npm run build
```
The output files will be created in the `dist/` directory.

### Preview Production Build
To test the generated production build locally:
```bash
npm run preview
```

---

## 7. Project File Structure

```text
student-card/
│
├── public/
│   ├── student1.jpg          # Sample student photograph 1
│   ├── student2.jpg          # Sample student photograph 2
│   └── college-logo.png      # University / StudentHub brand logo
│
├── src/
│   ├── assets/               # Static assets folder
│   │
│   ├── components/
│   │   ├── Navbar.jsx             # Top bar branding & live student count
│   │   ├── StudentCard.jsx        # Reusable individual student card
│   │   ├── StudentList.jsx        # Grid renderer for student cards / empty state
│   │   ├── SearchBar.jsx          # Live search input & department filter dropdown
│   │   ├── AddStudentForm.jsx     # Modal form for adding new student records
│   │   ├── EditStudentForm.jsx    # Modal form for editing existing students
│   │   ├── StudentDetails.jsx     # Modal displaying full student profile details
│   │   └── DeleteConfirmation.jsx # Modal confirmation dialog for record deletion
│   │
│   ├── data/
│   │   └── students.js            # Initial seed dataset with sample students
│   │
│   ├── hooks/
│   │   └── useStudents.js         # Custom hook managing CRUD & LocalStorage sync
│   │
│   ├── styles/
│   │   ├── global.css             # Base reset, typography, and color variables
│   │   ├── Dashboard.css          # Navigation, hero header, stats, and search bar
│   │   ├── StudentCard.css        # Card styling, badges, buttons, and animations
│   │   └── Forms.css              # Modals, form fields, validation states, and overlays
│   │
│   ├── utils/
│   │   └── validation.js          # Form validation helper functions
│   │
│   ├── App.jsx                    # Root application component orchestrating states
│   └── main.jsx                   # React DOM entry point
│
├── README.md
├── PRD.md
├── DESIGN.md
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 8. Future Enhancements

- **ID Card PDF Export**: Download standard printable student identity card badges with barcodes / QR codes.
- **Cloud Backend Integration**: Integrate with a REST or GraphQL backend (Express.js / Node.js) and database (MongoDB / PostgreSQL).
- **Role-Based Authentication**: Separate administrative privileges (Add/Edit/Delete) from faculty or student read-only view access.
- **Batch Import / Export**: Support CSV or Excel file import and export for large-scale institutional record management.
- **Photo Webcam Capture**: Allow direct webcam capture of student photos during the registration process.
