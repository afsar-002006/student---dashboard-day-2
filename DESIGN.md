# UI / UX Design Document

## Project Name: Student Card Management System (StudentHub)

---

## 1. Design Overview & Theme

The **StudentHub** user interface follows a modern, clean, and professional academic dashboard aesthetic. The design is inspired by premier university identity systems, student portals, and contemporary administrative dashboards. 

### Design Principles:
- **Clarity & Hierarchy**: Content is logically separated with distinct visual weighting, clear typography, and whitespace.
- **Academic Elegance**: Balanced palette featuring Royal Blue (`#2563EB`) as the signature primary brand color, backed by Deep Navy (`#172554`) for institutional authority.
- **Defensive & Feedback-Driven**: Clear visual cues on hover, focused input rings, descriptive error states, and safe destructive action confirmations.
- **Responsive Symmetry**: Standard 2-column card layout on desktop and tablet for optimal readability of metadata fields, adapting smoothly to single-column on mobile viewports.

---

## 2. Color Palette

The color system is defined in `src/styles/global.css` as reusable CSS custom properties:

| Variable Name | Hex Code | Visual Swatch | Role & Application |
|---|---|---|---|
| `--color-primary` | `#2563EB` | Royal Blue | Primary actions, brand accents, active filters, card top bar |
| `--color-primary-dark` | `#1D4ED8` | Blue Hover | Hover state for primary buttons |
| `--color-navy` | `#172554` | Dark Navy | Navbar background, main headlines, brand crest |
| `--color-bg` | `#F5F7FA` | Off-White / Light Slate | Global page canvas background |
| `--color-card-bg` | `#FFFFFF` | Pure White | Surface background for student cards and modals |
| `--color-text-main` | `#0F172A` | Slate-900 | High-contrast body text, student names, modal titles |
| `--color-text-secondary` | `#64748B` | Slate-500 | Field labels, registration badges, secondary descriptors |
| `--color-border` | `#E2E8F0` | Slate-200 | Dividers, card boundaries, input borders |
| `--color-danger` | `#DC2626` | Red-600 | Delete buttons, destructive actions, validation errors |
| `--color-danger-hover` | `#B91C1C` | Red-700 | Hover state for destructive buttons |
| `--color-success` | `#16A34A` | Emerald-600 | Success indicators, verified badges, active student indicators |
| `--color-accent-soft` | `#EFF6FF` | Sky-50 | Avatar fallback backgrounds, active button states, stat boxes |

---

## 3. Typography

The application utilizes the modern sans-serif typeface **Inter** loaded via Google Fonts with system fallbacks:

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Typographic Scale & Weights:
- **Navigation Brand**: 20px / 1.25rem | Weight: 700 (Bold)
- **Dashboard Heading 1**: 28px / 1.75rem | Weight: 700 (Bold)
- **Section Heading 2**: 20px / 1.25rem | Weight: 600 (Semi-bold)
- **Student Name (Card Title)**: 18px / 1.125rem | Weight: 600 (Semi-bold)
- **Body & Metadata**: 14px / 0.875rem | Weight: 400 (Regular) & 500 (Medium)
- **Badges & Labels**: 12px / 0.75rem | Weight: 600 (Semi-bold, Uppercase tracking)
- **Validation Error Text**: 12px / 0.75rem | Weight: 500 (Medium)

---

## 4. Student Card Layout & Specifications

Every student card is enclosed in an article container adhering to the university identity card aesthetic:

```text
┌────────────────────────────────────────────────────────┐
│  [================ Blue Top Accent ================]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│   ┌──────────┐    Student Name               [STUDENT] │
│   │  Photo   │    Reg No: 23CS001                      │
│   │    or    │    ────────────────────────────────     │
│   │ Initials │    Department: Computer Science         │
│   └──────────┘    Year: III Year    |  Sem: Semester V │
│                   Email: ananya@college.edu            │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [ View Details ]        [ Edit ]        [ Delete ]   │
└────────────────────────────────────────────────────────┘
```

### Visual Specifications:
1. **Blue Top Accent**: A 4px solid line (`#2563EB`) anchoring the card's top edge.
2. **Profile Avatar**:
   - 72px × 72px circular container (`border-radius: 50%`).
   - Profile image with `object-fit: cover`.
   - Fallback avatar: Soft blue background (`#EFF6FF`), 2-letter uppercase initials in `#2563EB`, font-weight 700.
3. **Student Badge**:
   - Pill badge (`#EFF6FF` background with `#2563EB` text and border).
   - Text: `STUDENT` with uppercase letter-spacing.
4. **Metadata Alignment**:
   - Clean tabular rows with subtle icons or bold labels.
   - Truncated text with tooltips for long department names.
5. **Interactive Actions**:
   - Bottom action bar with three clear, accessible buttons.
   - **View Details**: Outlined blue button.
   - **Edit**: Neutral slate outline button.
   - **Delete**: Soft red tint button transitioning to solid red on hover.
6. **Card Elevation**:
   - Default: `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)`
   - Hover: Elevated `translateY(-3px)` with `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08)`.

---

## 5. Component Specifications

### 5.1 Navbar (`Navbar.jsx`)
- Fixed or sticky top bar in Dark Navy (`#172554`).
- College emblem logo (`/college-logo.png`) paired with the "StudentHub" brand mark.
- Right section displaying the live counter badge (`X Students Registered`) in a translucent white pill.

### 5.2 Dashboard Header & Summary Stats
- Title: "Student Directory".
- Subtitle: "Manage student profiles, academic progression, and identity cards".
- Primary CTA: "+ Add Student" button with prominent `#2563EB` background.
- Summary Statistics Bar:
  - Total Students registered.
  - Active Display Count (responsive to search/filter criteria).
  - Department Count.

### 5.3 Search & Filter Controls (`SearchBar.jsx`)
- Search input with search icon, clear button, and placeholder: `Search by student name or register number...`.
- Department filter `<select>` dropdown populated dynamically with unique departments.

### 5.4 Student Grid (`StudentList.jsx`)
- Container with CSS Grid.
- Empty search state: Friendly illustration/icon, "No students found", and quick reset action.

### 5.5 Add & Edit Forms (`AddStudentForm.jsx` & `EditStudentForm.jsx`)
- Centered modal dialog with backdrop blur and overlay (`rgba(15, 23, 42, 0.5)`).
- Two-column or structured vertical grid of form controls.
- Real-time inline validation labels directly underneath inputs.

### 5.6 Student Details Modal (`StudentDetails.jsx`)
- Rich student ID card preview with university header, high-res avatar, matriculation data, and contact coordinates.

### 5.7 Delete Confirmation Dialog (`DeleteConfirmation.jsx`)
- Warning dialog with red danger accent.
- Explicitly states: "Are you sure you want to delete [Student Name] (Reg: [RegNo])? This action cannot be undone."
- Actions: "Cancel" (neutral) and "Delete Student" (danger).

---

## 6. Responsive Behavior

| Breakpoint | Viewport Width | Layout Rules |
|---|---|---|
| **Desktop** | `> 992px` | 2 student cards per row (`grid-template-columns: repeat(2, 1fr)`); inline stats; horizontal search bar. |
| **Tablet** | `768px - 992px` | 2 student cards per row where space permits; stacked search controls. |
| **Mobile** | `< 768px` | 1 student card per row (`grid-template-columns: 1fr`); full-width buttons; stacked navbar and search. |

---

## 7. Accessibility (a11y) & Usability

- **Color Contrast**: All text elements exceed WCAG AA ratio (4.5:1 for normal text, 3:1 for large text).
- **Keyboard Navigation**: Form inputs, select dropdowns, and modal action buttons provide visible focus rings (`outline: 2px solid #2563EB; outline-offset: 2px`).
- **Screen Reader Support**: Semantic HTML tags (`<nav>`, `<main>`, `<article>`, `<header>`, `<dialog>`/modal overlays with `aria-modal="true"`).
- **Image Fallbacks**: Profile images include descriptive `alt` tags (`alt={student.name}`) with automatic switch to initials badge if the image fails to load.
