import React from "react";

export default function Navbar({ studentCount }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="brand">
                    <img
                        src="/college-logo.png"
                        alt="StudentHub College Emblem"
                        className="brand-logo"
                        onError={(e) => {
                            // Hide image if fails and let text badge render
                            e.target.style.display = "none";
                        }}
                    />
                    <div className="brand-text">
                        <h1 className="brand-title">MSAJCEA</h1>
                        <span className="brand-subtitle">Student Card Management System</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    <div className="counter-pill" title="Total enrolled students in directory">
                        <span className="counter-dot"></span>
                        <span className="counter-label">Enrolled:</span>
                        <span className="counter-value">{studentCount} Students</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
