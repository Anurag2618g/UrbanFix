"use client";
import React from 'react';

const Header = () => (
  <>
    <style>
      {`
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
      `}
    </style>
    <header className="site-header">
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-section">
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
          <a href="/login" className="nav-link">
            Admin
          </a>
        </nav>
        {/* TODO: Add a mobile menu button here */}
      </div>
    </header>
  </>
);

export default Header;
