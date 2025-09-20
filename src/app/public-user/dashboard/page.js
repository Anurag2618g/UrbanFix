"use client";
import { useState } from "react";

// A custom component to handle the status badge logic
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Resolved: "bg-green-100 text-green-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Pending: "bg-red-100 text-red-600",
  };
  const className = `px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status] || ""}`;

  return <span className={className}>{status}</span>;
};

// A custom component for each issue item
const IssueItem = ({ issue }) => (
  <div className="issue-item">
    <p className="issue-title">{issue.title}</p>
    <StatusBadge status={issue.status} />
  </div>
);

// New Header Component
const Header = () => (
  <header className="site-header">
    <div className="header-container">
      {/* Logo on the left */}
      <div className="logo-section">
        {/* Placeholder for a logo, can be replaced with a real SVG or image */}
        <span role="img" aria-label="city-logo" className="logo-icon">🏙️</span>
        <span className="logo-text">CivicConnect</span>
      </div>

      {/* Navigation links on the right */}
      <nav className="header-nav">
        <a href="/home" className="nav-link">
          Home
        </a>
        <a href="/complaints" className="nav-link">
          Complaints
        </a>
        <a href="/resolved" className="nav-link">
          Resolved
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/feedback" className="nav-link">
          Feedback
        </a>
      </nav>
      {/* TODO: Add a mobile menu button here */}
    </div>
  </header>
);

// The main page component which is the default export
const PublicDashboard = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: "Pothole near main road", status: "Pending" },
    { id: 2, title: "Streetlight not working", status: "In Progress" },
    { id: 3, title: "Garbage not collected", status: "Resolved" },
  ]);

  return (
    <>
      <style>
        {`
          /* Base Styles */
          .dashboard-container {
            min-height: 100vh;
            background-color: #f3f4f6;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }

          .site-header {
            background-color: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            width: 100%;
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .header-container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo-section {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .logo-icon {
            font-size: 1.875rem; /* 30px */
            color: #2563eb;
          }

          .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
            letter-spacing: -0.025em;
          }

          .header-nav {
            display: none;
            gap: 1.5rem;
          }

          @media (min-width: 768px) {
            .header-nav {
              display: flex;
            }
          }

          .nav-link {
            color: #4b5563;
            font-weight: 500;
            transition-property: color;
            transition-duration: 0.15s;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav-link:hover {
            color: #2563eb;
          }

          .main-content {
            max-width: 1024px;
            margin-left: auto;
            margin-right: auto;
            padding: 1.5rem;
          }

          .main-header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 640px) {
            .main-header {
              flex-direction: row;
              align-items: center;
            }
          }

          .main-title {
            font-size: 1.875rem;
            font-weight: 800;
            color: #1f2937;
            letter-spacing: -0.025em;
          }

          .report-button {
            background-color: #2563eb;
            color: #fff;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition-property: background-color;
            transition-duration: 0.15s;
            margin-top: 1rem;
          }

          .report-button:hover {
            background-color: #1d4ed8;
          }

          .report-button:active {
            transform: scale(0.95);
          }

          @media (min-width: 640px) {
            .report-button {
              margin-top: 0;
            }
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #374151;
            margin-bottom: 1rem;
          }

          .issues-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .issue-item {
            background-color: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            border-radius: 0.5rem;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            transition-property: transform;
            transition-duration: 0.1s;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          .issue-item:hover {
            transform: scale(1.01);
          }

          @media (min-width: 640px) {
            .issue-item {
              flex-direction: row;
              align-items: center;
            }
          }

          .issue-title {
            font-weight: 500;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          @media (min-width: 640px) {
            .issue-title {
              margin-bottom: 0;
            }
          }

          .empty-state {
            text-align: center;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
            color: #6b7280;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }

          .empty-text {
            margin-bottom: 0.5rem;
          }

          .empty-link {
            color: #2563eb;
            font-weight: 600;
            text-decoration: underline;
          }
        `}
      </style>
      <div className="dashboard-container">
        {/* The Header component is now included */}
        <Header />

        <div className="main-content">
          <header className="main-header">
            <h1 className="main-title">Community Complaints Dashboard</h1>
            <button className="report-button">
              + Report New Issue
            </button>
          </header>

          <section>
            <h2 className="section-title">My Submitted Issues</h2>
            {issues.length > 0 ? (
              <div className="issues-list">
                {issues.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-text">No issues have been reported yet. Be the first to report one!</p>
                <button className="empty-link">
                  Report a New Issue
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

// The component is now the default export, resolving the Next.js error.
export default PublicDashboard;
