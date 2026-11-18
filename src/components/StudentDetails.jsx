import React, { useState } from "react";

function getInitials(name) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function StudentDetails({ student, onClose, onEdit }) {
  const [imageError, setImageError] = useState(false);

  if (!student) return null;

  const hasValidImage = Boolean(student.image && student.image.trim() && !imageError);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="details-title"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-container details-modal">
        <div className="details-header-card">
          <div className="details-cover-bar"></div>

          <button
            type="button"
            className="modal-close-btn details-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="details-profile-header">
            <div className="details-avatar-wrapper">
              {hasValidImage ? (
                <img
                  src={student.image}
                  alt={`${student.name}'s photograph`}
                  className="details-photo"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="details-initials-avatar">
                  {getInitials(student.name)}
                </div>
              )}
            </div>

            <div className="details-title-group">
              <div className="badge-row">
                <span className="student-badge">Active Student</span>
                <span className="register-badge">{student.registerNumber}</span>
              </div>
              <h2 id="details-title" className="details-name">
                {student.name}
              </h2>
              <p className="details-dept">{student.department}</p>
            </div>
          </div>
        </div>

        <div className="details-body">
          <h3 className="details-section-heading">Academic Information</h3>

          <div className="details-info-grid">
            <div className="details-card-item">
              <span className="details-item-label">Register Number</span>
              <span className="details-item-value">{student.registerNumber}</span>
            </div>

            <div className="details-card-item">
              <span className="details-item-label">Academic Program / Dept</span>
              <span className="details-item-value">{student.department}</span>
            </div>

            <div className="details-card-item">
              <span className="details-item-label">Current Academic Year</span>
              <span className="details-item-value">{student.year}</span>
            </div>

            <div className="details-card-item">
              <span className="details-item-label">Current Semester</span>
              <span className="details-item-value">{student.semester}</span>
            </div>

            <div className="details-card-item full-width">
              <span className="details-item-label">Institutional Email</span>
              <a
                href={`mailto:${student.email}`}
                className="details-item-value email-link"
              >
                {student.email}
              </a>
            </div>

            <div className="details-card-item full-width">
              <span className="details-item-label">Student ID Reference</span>
              <span className="details-item-value text-muted">
                SYS-ID-{student.id}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-actions details-actions">
          {onEdit && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              Edit Information
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
