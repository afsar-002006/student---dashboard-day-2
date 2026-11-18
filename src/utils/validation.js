/**
 * Validates student form data for both Add and Edit operations.
 *
 * @param {Object} student - The student form object
 * @param {Array} students - The existing list of students
 * @param {number|string|null} editingId - The ID of the student being edited (null for new student)
 * @returns {Object} An object containing field-specific error messages
 */
export function validateStudent(student, students = [], editingId = null) {
  const errors = {};

  // 1. Student Name validation
  if (!student.name || !student.name.trim()) {
    errors.name = "Student name is required.";
  } else if (student.name.trim().length < 2) {
    errors.name = "Student name must be at least 2 characters.";
  }

  // 2. Register Number validation
  const trimmedReg = (student.registerNumber || "").trim();
  if (!trimmedReg) {
    errors.registerNumber = "Register number is required.";
  } else if (trimmedReg.length < 3) {
    errors.registerNumber = "Register number must be at least 3 characters.";
  } else {
    // Check uniqueness (case-insensitive, ignoring the current record if editing)
    const isDuplicate = students.some(
      s =>
        s.registerNumber.trim().toLowerCase() === trimmedReg.toLowerCase() &&
        s.id !== editingId
    );
    if (isDuplicate) {
      errors.registerNumber = "This register number is already registered to another student.";
    }
  }

  // 3. Department validation
  if (!student.department || !student.department.trim()) {
    errors.department = "Department is required.";
  }

  // 4. Academic Year validation
  if (!student.year || !student.year.trim()) {
    errors.year = "Please select an academic year.";
  }

  // 5. Semester validation
  if (!student.semester || !student.semester.trim()) {
    errors.semester = "Semester is required.";
  }

  // 6. Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimmedEmail = (student.email || "").trim();
  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address (e.g., student@college.edu).";
  }

  return errors;
}
