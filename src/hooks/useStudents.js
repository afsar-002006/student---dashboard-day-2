import { useState, useEffect } from "react";
import initialStudents from "../data/students";

const STORAGE_KEY = "student_hub_records";

export default function useStudents() {
  const [students, setStudents] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Failed to load students from LocalStorage:", err);
    }
    return initialStudents;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error("Failed to save students to LocalStorage:", err);
    }
  }, [students]);

  const addStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: Date.now(),
      name: newStudent.name.trim(),
      registerNumber: newStudent.registerNumber.trim().toUpperCase(),
      department: newStudent.department.trim(),
      year: newStudent.year.trim(),
      semester: newStudent.semester.trim(),
      email: newStudent.email.trim().toLowerCase(),
      image: (newStudent.image || "").trim()
    };
    setStudents((prev) => [studentWithId, ...prev]);
  };

  const updateStudent = (updatedStudent) => {
    const sanitized = {
      ...updatedStudent,
      name: updatedStudent.name.trim(),
      registerNumber: updatedStudent.registerNumber.trim().toUpperCase(),
      department: updatedStudent.department.trim(),
      year: updatedStudent.year.trim(),
      semester: updatedStudent.semester.trim(),
      email: updatedStudent.email.trim().toLowerCase(),
      image: (updatedStudent.image || "").trim()
    };
    setStudents((prev) =>
      prev.map((s) => (s.id === sanitized.id ? sanitized : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent
  };
}
