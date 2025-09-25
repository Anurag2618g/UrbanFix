<<<<<<< HEAD:Frontend/src/app/public-user/dashboard/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
=======
// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../style/au-dashboard.module.css';
>>>>>>> main:src/app/public-user/dashboard/page.js


<<<<<<< HEAD:Frontend/src/app/public-user/dashboard/page.js
  return <span className={className}>{status}</span>;
};

// A custom component for each issue item
const IssueItem = ({ issue }) => (
  <div className="issue-item">
    <p className="issue-title">{issue.title}</p>
    <StatusBadge status={issue.status} />
  </div>
);

// Header Component with mobile menu functionality
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-section">
          <span role="img" aria-label="city-logo" className="logo-icon">🏙️</span>
          <span className="logo-text">CivicConnect</span>
        </div>
        <nav className={`header-nav ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <Link href="/publ/dashboardic-user" className="nav-link">
            Home
          </Link>
          <Link href="/public-user/Complaints" className="nav-link">
            Complaints
          </Link>
          <Link href="/public-user/resolved" className="nav-link">
            Resolved
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/public-user/feedback" className="nav-link">
            Feedback
          </Link>
        </nav>
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
          :root {
            --bg-color: #f3f4f6;
            --text-color: #1f2937;
            --secondary-text-color: #4b5563;
            --accent-color: #2563eb;
            --white-color: #fff;
            --shadow-light: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .dashboard-container {
            min-height: 100vh;
            background-color: var(--bg-color);
            font-family: ui-sans-serif, system-ui, sans-serif;
            display: flex;
            flex-direction: column;
          }

          /* Header */
          .site-header {
            background-color: #1f2937; /* Dark background for header */
            color: var(--white-color);
            box-shadow: var(--shadow-md);
            width: 100%;
            position: sticky;
            top: 0;
            z-index: 50;
          }
          
          .site-header .nav-link, .site-header .logo-text, .site-header .mobile-menu-button {
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
            display: none; /* Hide by default on small screens */
            gap: 1.5rem;
          }

          /* Mobile Menu Toggle */
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
          }

          /* Main Content */
          .main-content {
            flex-grow: 1;
            max-width: 1024px;
            margin: 0 auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            background-color: var(--white-color); /* White background for main content */
            border-radius: 0.75rem;
            box-shadow: var(--shadow-md);
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .main-header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
          }

          .main-title {
            font-size: 1.875rem;
            font-weight: 800;
            color: var(--text-color);
            letter-spacing: -0.025em;
            margin-bottom: 1rem;
          }

          .report-button {
            background-color: var(--accent-color);
            color: var(--white-color);
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: background-color 0.15s ease-in-out, transform 0.1s ease-in-out;
          }

          .report-button:hover {
            background-color: #1d4ed8;
          }

          .report-button:active {
            transform: scale(0.95);
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
            background-color: var(--white-color);
            box-shadow: var(--shadow-light);
            border-radius: 0.5rem;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            transition: transform 0.1s ease-in-out;
          }

          .issue-item:hover {
            transform: scale(1.01);
          }

          .issue-title {
            font-weight: 500;
            color: var(--text-color);
            margin-bottom: 0.5rem;
          }

          .empty-state {
            text-align: center;
            padding: 2.5rem;
            color: #6b7280;
            background-color: var(--white-color);
            border-radius: 0.5rem;
            box-shadow: var(--shadow-light);
          }

          .empty-text {
            margin-bottom: 0.5rem;
          }

          .empty-link {
            color: var(--accent-color);
            font-weight: 600;
            text-decoration: underline;
          }

          /* Footer */
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

          /* Media Queries for Responsiveness */
          @media (min-width: 640px) {
            .main-header {
              flex-direction: row;
              align-items: center;
            }
            .main-title {
              margin-bottom: 0;
            }
            .report-button {
              margin-top: 0;
            }
            .issue-item {
              flex-direction: row;
              align-items: center;
            }
            .issue-title {
              margin-bottom: 0;
            }
          }

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
      <div className="dashboard-container">
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
=======
export default function Home() {
  // Sample civic issues data
  const civicIssues = [
    {
      id: 1,
      title: "Road Pothole on Main Street",
      description: "Large pothole causing traffic issues and vehicle damage",
      location: "Main Street, Downtown",
      status: "Reported",
      date: "2024-09-20"
    },
    {
      id: 2,
      title: "Street Light Not Working",
      description: "Street light has been out for 2 weeks, safety concern",
      location: "Park Avenue, Sector 5",
      status: "In Progress",
      date: "2024-09-18"
    },
    {
      id: 3,
      title: "Garbage Collection Missed",
      description: "Garbage not collected for 3 days in residential area",
      location: "Green Valley, Block B",
      status: "Resolved",
      date: "2024-09-15"
    },
    {
      id: 4,
      title: "Water Supply Issue",
      description: "Low water pressure reported by multiple residents",
      location: "Civil Lines, Ward 12",
      status: "Reported",
      date: "2024-09-22"
    },
    {
      id: 5,
      title: "Broken Sidewalk",
      description: "Cracked sidewalk poses risk to pedestrians",
      location: "Market Road, Near Bus Stop",
      status: "In Progress",
      date: "2024-09-19"
    },
    {
      id: 6,
      title: "Noise Pollution",
      description: "Construction work during prohibited hours",
      location: "Residential Area, Sector 8",
      status: "Reported",
      date: "2024-09-21"
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>CivicConnect - Public Issues Platform</title>
        <meta name="description" content="Report and track civic issues in your community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Link href="/">
              <h2>CivicConnect</h2>
            </Link>
          </div>
          <nav className={styles.navigation}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/public-user/about" className={styles.navLink}>About</Link>
            <Link href="/public-user/feedback" className={styles.navLink}>Feedback</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          {/* Left Side - User Actions */}
          <div className={styles.leftPanel}>
            <div className={styles.actionCard}>
              <h3>Quick Actions</h3>
              <div className={styles.actionButtons}>
                <Link href="/public-user/reporting_issue" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>📝</div>
                  <span>Report Issue</span>
                </Link>
                
                <Link href="/my-feedback" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>💬</div>
                  <span>my feed</span>
                </Link>
                
                <Link href="/near-me" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>📍</div>
                  <span>Near Me</span>
                </Link>
                
                <Link href="/in-city" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>🏙️</div>
                  <span>In City</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Civic Issues */}
          <div className={styles.rightPanel}>
            <div className={styles.issuesCard}>
              <h3>Recent Civic Issues</h3>
              <div className={styles.issuesContainer}>
                {civicIssues.map((issue) => (
                  <div key={issue.id} className={styles.issueItem}>
                    <div className={styles.issueHeader}>
                      <h4>{issue.title}</h4>
                      <span className={`${styles.status} ${styles[issue.status.toLowerCase().replace(' ', '')]}`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className={styles.issueDescription}>{issue.description}</p>
                    <div className={styles.issueFooter}>
                      <span className={styles.issueLocation}>📍 {issue.location}</span>
                      <span className={styles.issueDate}>{issue.date}</span>
                    </div>
                  </div>
>>>>>>> main:src/app/public-user/dashboard/page.js
                ))}
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD:Frontend/src/app/public-user/dashboard/page.js
        <Footer />
      </div>
    </>
  );
};

export default PublicDashboard;
=======
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h4>CivicConnect</h4>
            <p>Connecting citizens with their community</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <Link href="/report-issue" className={styles.footerLink}>Report Issue</Link>
            <Link href="/track-issue" className={styles.footerLink}>Track Issue</Link>
            <Link href="/about" className={styles.footerLink}>About Us</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <Link href="/help" className={styles.footerLink}>Help Center</Link>
            <Link href="/feedback" className={styles.footerLink}>Feedback</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>Facebook</a>
              <a href="#" className={styles.socialLink}>Twitter</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 CivicConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
>>>>>>> main:src/app/public-user/dashboard/page.js
