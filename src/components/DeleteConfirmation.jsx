import React from "react";

export default function DeleteConfirmation({ student, onCancel, onConfirm }) {
  if (!student) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onCancel();
      }}
    >
      <div className="modal-container delete-dialog">
        <div className="delete-icon-wrapper">
          <span className="delete-icon" aria-hidden="true">
            ⚠️
          </span>
        </div>

        <div className="delete-content">
          <h2 id="delete-dialog-title" className="delete-title">
            Delete Student Record?
          </h2>
          <p className="delete-message">
            Are you sure you want to permanently remove{" "}
            <strong>{student.name}</strong> (Register Number:{" "}
            <code>{student.registerNumber}</code>)?
          </p>
          <p className="delete-warning">
            This action cannot be undone. The student profile will be deleted from
            the active directory and LocalStorage.
          </p>
        </div>

        <div className="modal-actions delete-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}
