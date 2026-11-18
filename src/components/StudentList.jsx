import React from "react";
import StudentCard from "./StudentCard";

export default function StudentList({
  students,
  onView,
  onEdit,
  onDelete,
  onResetSearch
}) {
  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3 className="empty-title">No Students Found</h3>
        <p className="empty-desc">
          No student records matched your search query or department filter. Try adjusting your
          filters or register a new student.
        </p>
        {onResetSearch && (
          <button type="button" className="btn btn-secondary" onClick={onResetSearch}>
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="student-grid" role="region" aria-label="Student Directory Grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
