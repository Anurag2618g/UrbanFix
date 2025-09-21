"use client";
import { useState } from "react";
import Link from "next/link";

// Header Component
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
          <Link href="/public-user/resolved" className="nav-link">
            Resolved
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/feedback" className="nav-link">
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

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() || rating > 0) {
      // Here you would typically send the feedback and rating to a server
      console.log("Feedback submitted:", { feedback, rating });
      setIsSubmitted(true);
      setFeedback("");
      setRating(0);
    }
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
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

          /* Feedback Page Styles */
          .feedback-container {
            max-width: 600px;
            margin: 2rem auto;
            background-color: #fff;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            flex-grow: 1; /* Allows it to take up available space */
          }
          .feedback-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #1f2937;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .feedback-subtitle {
            text-align: center;
            color: #6b7280;
            margin-bottom: 2rem;
            font-size: 1rem;
          }
          .feedback-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .feedback-textarea {
            width: 100%;
            min-height: 200px;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-family: inherit;
            resize: vertical;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .feedback-textarea:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
          }
          .submit-button {
            background-color: #2563eb;
            color: #fff;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
            border: none;
          }
          .submit-button:hover {
            background-color: #1d4ed8;
          }
          .success-message {
            text-align: center;
            padding: 1rem;
            background-color: #d1fae5;
            color: #065f46;
            border-radius: 0.5rem;
          }
          .success-message-text {
            font-weight: 600;
          }

          /* Star Rating Styles */
          .star-rating {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
            gap: 0.25rem;
          }
          .star {
            font-size: 2rem;
            color: #d1d5db; /* Default gray color */
            cursor: pointer;
            transition: color 0.2s ease-in-out;
          }
          .star.filled {
            color: #fcd34d; /* Yellow for filled stars */
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
        <div className="feedback-container">
          <h1 className="feedback-title">Your Voice Matters</h1>
          <p className="feedback-subtitle">Help us improve our community by sharing your valuable feedback and a rating with the authorities. Your thoughts can make a difference!</p>
          
          {isSubmitted ? (
            <div className="success-message">
              <p className="success-message-text">Thank you for your feedback! It has been submitted successfully.</p>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="star-rating" onMouseLeave={() => setHoverRating(0)}>
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <span
                      key={starValue}
                      className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
              <textarea
                className="feedback-textarea"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="submit-button">
                Submit Feedback
              </button>
            </form>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FeedbackPage;