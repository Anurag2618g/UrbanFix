"use client";
import { useState } from "react";
import Link from "next/link";

// Header Component with mobile menu functionality
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-section">
          <span role="img" aria-label="city-logo" className="logo-icon">🏙️</span>
          <span className="logo-text">CivicConnect</span>
        </div>

        {/* Navigation links on the right */}
        <nav className={`header-nav ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <Link href="/public-user/dashboard" className="nav-link">
            Home
          </Link>
          <Link href="/public-user/Complaints" className="nav-link">
            Complaints
          </Link>
          <Link href="/resolved" className="nav-link">
            Resolved
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/public-user/feedback" className="nav-link">
            Feedback
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">
      <p>&copy; 2025 CivicConnect. All rights reserved.</p>
      <div className="footer-links">
        <Link href="/privacy" className="footer-link">Privacy Policy</Link>
        <Link href="/terms" className="footer-link">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

const ResolvedIssueItem = ({ issue, onVote }) => {
  return (
    <div className="resolved-card">
      <h3 className="resolved-title">{issue.title}</h3>
      <p className="resolved-description">{issue.description}</p>
      <div className="resolved-footer">
        <div className="resolved-vote-section">
          <button className="vote-button" onClick={() => onVote(issue.id)}>
            <span role="img" aria-label="thumbs-up">👍</span>
          </button>
          <span className="vote-count">{issue.votes} Votes</span>
        </div>
      </div>
    </div>
  );
};

const ResolvedPage = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Pothole near main road fixed",
      description: "The large pothole on Oak Street has been filled and resurfaced. Traffic is now flowing smoothly.",
      votes: 42,
    },
    {
      id: 2,
      title: "Streetlight on Elm Street repaired",
      description: "The broken streetlight has been repaired, improving visibility and safety in the area.",
      votes: 21,
    },
    {
      id: 3,
      title: "Park benches restored",
      description: "The damaged benches in City Park have been replaced with new, durable ones for public use.",
      votes: 18,
    },
  ]);

  const handleVote = (id) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, votes: issue.votes + 1 } : issue
    ));
  };

  return (
    <>
      <style>
        {`
          /* CSS Variables for consistent styling */
          :root {
            --bg-color: #f3f4f6;
            --text-color: #1f2937;
            --secondary-text-color: #4b5563;
            --accent-color: #2563eb;
            --white-color: #fff;
            --shadow-light: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
          }

          .page-container {
            min-height: 100vh;
            background-color: var(--bg-color);
            font-family: ui-sans-serif, system-ui, sans-serif;
            display: flex;
            flex-direction: column;
          }

          /* Header Styles */
          .site-header {
            background-color: #1f2937;
            color: var(--white-color);
            box-shadow: var(--shadow-md);
            width: 100%;
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .site-header .logo-text, .site-header .nav-link {
            color: var(--white-color);
          }

          .site-header .nav-link:hover {
            color: var(--accent-color);
          }

          .header-container {
            max-width: 1280px;
            margin: 0 auto;
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
            font-size: 1.875rem;
            color: var(--accent-color);
          }

          .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.025em;
          }

          .header-nav {
            display: none;
            gap: 1.5rem;
          }

          .header-nav.mobile-menu-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #1f2937;
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-md);
          }

          .nav-link {
            color: var(--secondary-text-color);
            font-weight: 500;
            transition: color 0.15s ease-in-out;
          }

          .nav-link:hover {
            color: var(--accent-color);
          }

          .mobile-menu-button {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--white-color);
          }
          /* Resolved Page Styles */
          .resolved-page-content {
            flex-grow: 1;
            padding: 1rem;
          }

          .resolved-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
          }
          
          .resolved-title-section {
            text-align: center;
            margin-bottom: 2rem;
          }
          .resolved-page-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 0.5rem;
            letter-spacing: -0.025em;
          }
          .resolved-page-subtitle {
            color: #6b7280;
            font-size: 1.125rem;
          }
          .resolved-grid {
            display: grid;
            gap: 1.5rem;
          }
          .resolved-card {
            background-color: #fff;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition-property: transform, box-shadow;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
            border-left: 5px solid #10b981; /* green border */
          }
          .resolved-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .resolved-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          .resolved-description {
            color: #4b5563;
            line-height: 1.5;
            margin-bottom: 1rem;
          }
          .resolved-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .resolved-vote-section {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .vote-button {
            background-color: #f3f4f6;
            border: 1px solid #d1d5db;
            padding: 0.5rem 0.75rem;
            border-radius: 9999px;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
          }
          .vote-button:hover {
            background-color: #e5e7eb;
          }
          .vote-count {
            font-weight: 600;
            color: #374151;
          }
          
          /* Footer Styles */
          .site-footer {
            background-color: #374151;
            color: #d1d5db;
            padding: 2rem 1.5rem;
            text-align: center;
            margin-top: auto;
          }

          .footer-container {
            max-width: 1280px;
            margin: 0 auto;
          }

          .footer-links {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .footer-link {
            color: #9ca3af;
            transition: color 0.15s ease-in-out;
          }

          .footer-link:hover {
            color: #e5e7eb;
          }

          /* Media Queries */
          @media (min-width: 768px) {
            .header-nav {
              display: flex;
              flex-direction: row;
              position: static;
              background-color: transparent;
            }
            .mobile-menu-button {
              display: none;
            }
            .footer-links {
              flex-direction: row;
              justify-content: center;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      <div className="page-container">
        <Header />
        <div className="resolved-page-content">
          <div className="resolved-container">
            <div className="resolved-title-section">
              <h1 className="resolved-page-title">Resolved Issues</h1>
              <p className="resolved-page-subtitle">See how your complaints have been resolved and vote for your favorites!</p>
            </div>
            <div className="resolved-grid">
              {issues.map(issue => (
                <ResolvedIssueItem key={issue.id} issue={issue} onVote={handleVote} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ResolvedPage;