# Product Requirements Document (PRD)

## Project Name: Student Card Management System (StudentHub)

---

## 1. Problem Statement

Academic institutions often face friction when maintaining, reviewing, and verifying student identity credentials. Manual spreadsheets, legacy desktop software, or paper files cause significant bottlenecks:
- Searching for a specific student among hundreds of records is cumbersome.
- Filtering students by department or academic year requires manual sorting.
- Profile photos and identity cards are frequently lost or unlinked from academic metadata.
- Data inconsistency arises from duplicate registration numbers or inaccurate contact records.

The **Student Card Management System** resolves these challenges by offering a modern, digital, card-based web interface with instant search, multi-criteria filtering, unified CRUD operations, and persistent browser storage.

---

## 2. Project Goals

1. **Intuitive Visual Cards**: Present complete student identity and academic status at a glance using clean university-style profile cards.
2. **Instant Search & Discovery**: Enable faculty and staff to locate students immediately by either name or registration number.
3. **Structured Data Validation**: Enforce data integrity through rigorous validation for required fields, email syntax, and unique registration identifiers.
4. **Resilient Local Persistence**: Ensure seamless offline/client-side data retention via Browser LocalStorage.
5. **Responsive and Accessible Layout**: Deliver an uncompromised experience across desktop, tablet, and mobile displays.

---

## 3. Target Users

| User Persona | Responsibilities & Needs |
|---|---|
| **Academic Administrator** | Registers new students, updates academic years/semesters, manages records, and deletes outdated or graduated student profiles. |
| **Department Faculty / HOD** | Searches students by registration number, filters student lists by department, and verifies student enrollment details. |
| **Student Helpdesk & Verification Officer** | Inspects individual student profile details and confirms active identity status through photo and badge review. |

---

## 4. Functional Requirements

### FR-1: Student Card Display
- The system must display student records inside responsive cards laid out in a grid.
- Each student card must present:
  1. Student profile photograph (or circular fallback displaying initials if the image is missing or broken).
  2. Student full name.
  3. Student status badge ("Student" / Academic indicator).
  4. Unique Register Number (e.g., `23CS001`).
  5. Department name.
  6. Academic Year (e.g., `I Year`, `II Year`, `III Year`, `IV Year`).
  7. Semester (e.g., `Semester V`).
  8. Student institutional email address.
  9. Action buttons: **View Details**, **Edit**, **Delete**.

### FR-2: Add New Student
- The system must provide an accessible modal form with input fields for:
  - Full Name (text, required)
  - Register Number (text, alphanumeric, required, unique)
  - Department (text/dropdown, required)
  - Academic Year (selection, required)
  - Semester (text/selection, required)
  - Email Address (email format, required)
  - Profile Image URL (text, optional; accepts local paths like `/student1.jpg` or web URLs)
- Upon successful submission, the student record must be appended to the active list and persisted to LocalStorage.

### FR-3: Edit Student Information
- The system must provide a dedicated edit modal pre-populated with the target student's existing data.
- The user can update any profile field.
- Uniqueness validation must verify that the updated register number does not conflict with any *other* student in the database.

### FR-4: Safe Deletion with Confirmation
- Clicking **Delete** on a card must open a confirmation dialog specifying the student's name and register number.
- The record must only be removed if the user explicitly confirms the deletion action.
- Cancel action must safely dismiss the dialog without altering any data.

### FR-5: View Complete Student Details
- Clicking **View Details** must open an expanded student profile view showcasing high-resolution identity credentials, full department details, and contact information.

### FR-6: Real-Time Search
- Users can filter records dynamically through a search bar.
- Matching must be case-insensitive and operate on:
  - Student full name.
  - Student register number.
- Matched card counts must update dynamically in real time.

### FR-7: Department Filtering
- A dropdown filter must list all unique academic departments present in the database, alongside an "All Departments" option.
- Filtering must seamlessly combine with the active search query.

### FR-8: Browser LocalStorage Persistence
- All student modifications (additions, edits, deletions) must immediately sync to `localStorage`.
- Upon initial launch or cleared cache, the system must populate standard default sample records from `src/data/students.js`.

---

## 5. Non-Functional Requirements

- **Performance**: Sub-50ms UI response time for search queries and department filtering using client-side memoization (`useMemo`).
- **Usability & Aesthetic Quality**: Clean, modern academic aesthetic using corporate university blue `#2563EB`, dark navy `#172554`, and crisp slate neutrals.
- **Responsiveness**: Strict support for:
  - Desktop: 2 cards per row.
  - Tablet: 2 cards per row when screen width permits.
  - Mobile: 1 card per row.
- **Fault Tolerance**: Broken image links or missing images must automatically render an initials avatar badge without breaking card alignment or UI flow.
- **Maintainability**: Clear separation of concerns with isolated component files, custom hooks, and styling split across dedicated stylesheets in `src/styles/`.

---

## 6. Application Modules

```text
┌────────────────────────────────────────────────────────┐
│                        App.jsx                         │
├─────────────────┬──────────────────────┬───────────────┤
│    Navbar       │      Dashboard       │    Modals     │
│  - Logo         │  - Stats Overview    │  - Add Form   │
│  - Branding     │  - SearchBar & Filter│  - Edit Form  │
│  - Total Count  │  - StudentList       │  - Details    │
│                 │    └── StudentCard   │  - DeleteConf │
└─────────────────┴──────────────────────┴───────────────┘
```

| Module | Primary Component | Responsibility |
|---|---|---|
| **Navigation & Branding** | `Navbar.jsx` | University logo, brand identity, live student count counter |
| **Search & Filtering** | `SearchBar.jsx` | Query input for name/register number, department dropdown |
| **Student Grid Display** | `StudentList.jsx` | Grid container, empty search state fallback |
| **Profile Card** | `StudentCard.jsx` | Photo/avatar, metadata, action buttons, hover states |
| **Creation Form** | `AddStudentForm.jsx` | Student data capture, live validation, error display |
| **Modification Form** | `EditStudentForm.jsx` | Pre-populated student edit form, unique validation |
| **Profile Inspection** | `StudentDetails.jsx` | Full-screen modal showcasing complete student dossier |
| **Safety Deletion** | `DeleteConfirmation.jsx`| Action verification dialog preventing accidental deletion |
| **Data Synchronization** | `useStudents.js` | CRUD business logic, state management, LocalStorage sync |
| **Validation Utilities** | `validation.js` | Reusable validation rules and regex validators |

---

## 7. User Workflow

```text
[Launch Application]
       │
       ▼
[Initialize State from LocalStorage / students.js]
       │
       ▼
[Display Dashboard with Navbar, Stats, Search, and 2-Column Student Grid]
       │
       ├─────────────────┬─────────────────┬─────────────────┐
       ▼                 ▼                 ▼                 ▼
[Search / Filter]   [Add Student]    [Card Actions]    [Reload / Refresh]
       │                 │                 │                 │
       │                 ▼                 ▼                 ▼
       │         [Validate Inputs]   ┌───────────────┐ [Data Persisted in]
       │                 │           │ View Details  │ [Browser Storage ]
       ▼                 ▼           │ Edit Form     │
[Instant Dynamic  [Save to State &   │ Delete Confirm│
 Card Updates]     LocalStorage]     └───────────────┘
```

---

## 8. Acceptance Criteria

1. **Card Layout**: Cards render in a 2-column grid on desktop screens and collapse cleanly to 1 column on mobile screens.
2. **Card Fields**: All 8 required student properties are visible on each card.
3. **Initials Fallback**: When `image` is empty or encounters a loading error, an initials avatar is rendered.
4. **Search Accuracy**: Typing "23CS" filters only students whose register number contains "23CS"; typing a name filters by student name.
5. **Department Filter**: Selecting a department filters cards instantly; selecting "All Departments" resets the filter.
6. **Form Validation**:
   - Submitting an empty form highlights all required fields with red error hints.
   - Submitting a duplicate register number fails with "Register number already exists".
   - Submitting an invalid email address triggers an invalid email format warning.
7. **Edit Capability**: Modifying a student's department or semester updates the card immediately and persists to `localStorage`.
8. **Delete Safeguard**: Clicking Delete presents a confirmation modal; confirming deletes the student and updates the total counter.
9. **Build Verification**: `npm run build` generates a production build without errors or warnings.
