import React from "react";

export default function SearchBar({
  search,
  setSearch,
  department,
  setDepartment,
  departments
}) {
  return (
    <section className="search-filter-section" aria-label="Search and Filter Controls">
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by student name or register number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search students by name or register number"
        />
        {search && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearch("")}
            title="Clear search query"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-box">
        <label htmlFor="dept-filter" className="filter-label">
          Department:
        </label>
        <select
          id="dept-filter"
          className="filter-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Filter students by department"
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
