import React, { useState, useEffect } from "react";
import { validateStudent } from "../utils/validation";

export default function EditStudentForm({ student, students, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    id: student?.id,
    name: student?.name || "",
    registerNumber: student?.registerNumber || "",
    department: student?.department || "",
    year: student?.year || "",
    semester: student?.semester || "",
    email: student?.email || "",
    image: student?.image || ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name || "",
        registerNumber: student.registerNumber || "",
        department: student.department || "",
        year: student.year || "",
        semester: student.semester || "",
        email: student.email || "",
        image: student.image || ""
      });
      setErrors({});
    }
  }, [student]);

  if (!student) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateStudent(formData, students, student.id);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onUpdate(formData);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2 id="edit-modal-title" className="modal-title">
              Edit Student Record
            </h2>
            <p className="modal-subtitle">
              Updating record for: <strong>{student.name}</strong> ({student.registerNumber})
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="edit-name" className="form-label">
              Student Full Name <span className="required">*</span>
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="e.g. Ananya Raman"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="edit-reg" className="form-label">
                Register Number <span className="required">*</span>
              </label>
              <input
                id="edit-reg"
                name="registerNumber"
                type="text"
                className={`form-input ${errors.registerNumber ? "input-error" : ""}`}
                placeholder="e.g. 23CS001"
                value={formData.registerNumber}
                onChange={handleChange}
              />
              {errors.registerNumber && (
                <span className="error-message">{errors.registerNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-dept" className="form-label">
                Department <span className="required">*</span>
              </label>
              <input
                id="edit-dept"
                name="department"
                type="text"
                className={`form-input ${errors.department ? "input-error" : ""}`}
                placeholder="e.g. Computer Science and Engineering"
                value={formData.department}
                onChange={handleChange}
              />
              {errors.department && (
                <span className="error-message">{errors.department}</span>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="edit-year" className="form-label">
                Academic Year <span className="required">*</span>
              </label>
              <select
                id="edit-year"
                name="year"
                className={`form-select ${errors.year ? "input-error" : ""}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">-- Select Year --</option>
                <option value="I Year">I Year</option>
                <option value="II Year">II Year</option>
                <option value="III Year">III Year</option>
                <option value="IV Year">IV Year</option>
              </select>
              {errors.year && <span className="error-message">{errors.year}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-sem" className="form-label">
                Semester <span className="required">*</span>
              </label>
              <select
                id="edit-sem"
                name="semester"
                className={`form-select ${errors.semester ? "input-error" : ""}`}
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">-- Select Semester --</option>
                <option value="Semester I">Semester I</option>
                <option value="Semester II">Semester II</option>
                <option value="Semester III">Semester III</option>
                <option value="Semester IV">Semester IV</option>
                <option value="Semester V">Semester V</option>
                <option value="Semester VI">Semester VI</option>
                <option value="Semester VII">Semester VII</option>
                <option value="Semester VIII">Semester VIII</option>
              </select>
              {errors.semester && (
                <span className="error-message">{errors.semester}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-email" className="form-label">
              Institutional Email <span className="required">*</span>
            </label>
            <input
              id="edit-email"
              name="email"
              type="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="e.g. ananya.raman@college.edu"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-image" className="form-label">
              Profile Image URL / Path <span className="optional">(Optional)</span>
            </label>
            <input
              id="edit-image"
              name="image"
              type="text"
              className="form-input"
              placeholder="e.g. /student1.jpg or https://..."
              value={formData.image}
              onChange={handleChange}
            />
            <small className="form-hint">
              Leave blank to display a custom initials avatar fallback automatically.
            </small>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Student Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
