import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import EditStudentForm from "./components/EditStudentForm";
import StudentDetails from "./components/StudentDetails";
import DeleteConfirmation from "./components/DeleteConfirmation";
import useStudents from "./hooks/useStudents";

import "./styles/Dashboard.css";
import "./styles/StudentCard.css";
import "./styles/Forms.css";

export default function App() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Extract unique sorted list of departments
  const departments = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.department && s.department.trim()) {
        set.add(s.department.trim());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Dynamic search and filter
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const nameMatch = student.name?.toLowerCase().includes(query);
      const regMatch = student.registerNumber?.toLowerCase().includes(query);
      const matchesSearch = !query || nameMatch || regMatch;

      const matchesDept =
        department === "All" ||
        student.department?.toLowerCase() === department.toLowerCase();

      return matchesSearch && matchesDept;
    });
  }, [students, search, department]);

  const handleResetFilters = () => {
    setSearch("");
    setDepartment("All");
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  return (
    <div className="app-container">
      <Navbar studentCount={students.length} />

      <main className="main-content">
        {/* Dashboard Header Banner */}
        <section className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">Student Directory</h1>
            <p className="dashboard-description">
              Manage student profile cards, academic progression, and identity credentials.
            </p>
          </div>

          <div className="header-right">
            <button
              type="button"
              className="btn btn-primary btn-add"
              onClick={() => setIsAddOpen(true)}
            >
              <span className="plus-icon">+</span> Add New Student
            </button>
          </div>
        </section>

        {/* Dashboard Statistics Overview */}
        <section className="stats-grid" aria-label="Summary Statistics">
          <div className="stat-card">
            <span className="stat-label">Total Enrolled</span>
            <div className="stat-figure-row">
              <span className="stat-value">{students.length}</span>
              <span className="stat-badge">Active</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Matching Query</span>
            <div className="stat-figure-row">
              <span className="stat-value">{filteredStudents.length}</span>
              <span className="stat-subtext">of {students.length} students</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Departments</span>
            <div className="stat-figure-row">
              <span className="stat-value">{departments.length}</span>
              <span className="stat-subtext">Academic programs</span>
            </div>
          </div>
        </section>

        {/* Search and Filtering Section */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          departments={departments}
        />

        {/* Section Heading & Result Counter */}
        <div className="section-header-bar">
          <h2 className="section-title">
            Student Cards{" "}
            <span className="section-count">({filteredStudents.length})</span>
          </h2>
          {(search || department !== "All") && (
            <button
              type="button"
              className="btn-link"
              onClick={handleResetFilters}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Student Cards Grid */}
        <StudentList
          students={filteredStudents}
          onView={(student) => setViewingStudent(student)}
          onEdit={(student) => setEditingStudent(student)}
          onDelete={(student) => setDeletingStudent(student)}
          onResetSearch={handleResetFilters}
        />
      </main>

      {/* Add Student Modal */}
      {isAddOpen && (
        <AddStudentForm
          students={students}
          onAdd={addStudent}
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentForm
          student={editingStudent}
          students={students}
          onUpdate={updateStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {/* Student Details Inspection Modal */}
      {viewingStudent && (
        <StudentDetails
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
          onEdit={(student) => {
            setViewingStudent(null);
            setEditingStudent(student);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingStudent && (
        <DeleteConfirmation
          student={deletingStudent}
          onCancel={() => setDeletingStudent(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
