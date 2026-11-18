import React, { useState } from "react";

function getInitials(name) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function StudentCard({ student, onView, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(student.image && student.image.trim() && !imageError);

  return (
    <article className="student-card" aria-label={`Student card for ${student.name}`}>
      {/* Blue Top Accent */}
      <div className="card-top-accent"></div>

      <div className="card-header">
        <div className="avatar-wrapper">
          {hasValidImage ? (
            <img
              src={student.image}
              alt={`${student.name}'s profile photograph`}
              className="student-photo"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="initials-avatar" aria-label={`Initials for ${student.name}`}>
              {getInitials(student.name)}
            </div>
          )}
        </div>

        <div className="student-primary-meta">
          <div className="badge-row">
            <span className="student-badge">Student</span>
            <span className="register-badge">{student.registerNumber}</span>
          </div>
          <h2 className="student-name" title={student.name}>
            {student.name}
          </h2>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="info-label">Department</span>
          <span className="info-value" title={student.department}>
            {student.department}
          </span>
        </div>

        <div className="info-grid-two">
          <div className="info-row">
            <span className="info-label">Academic Year</span>
            <span className="info-value">{student.year}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Semester</span>
            <span className="info-value">{student.semester}</span>
          </div>
        </div>

        <div className="info-row">
          <span className="info-label">Email Address</span>
          <a
            href={`mailto:${student.email}`}
            className="info-value email-link"
            title={student.email}
          >
            {student.email}
          </a>
        </div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-view"
          onClick={() => onView(student)}
          title={`View full details of ${student.name}`}
        >
          View Details
        </button>
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(student)}
          title={`Edit record of ${student.name}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(student)}
          title={`Delete record of ${student.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
