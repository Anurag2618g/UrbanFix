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

const ComplaintPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoVideoFile, setPhotoVideoFile] = useState(null);
  const [voiceNote, setVoiceNote] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New complaint submitted:", {
      title,
      description,
      photoVideoFile: photoVideoFile ? photoVideoFile.name : "No file uploaded",
      voiceNote: voiceNote ? "Voice note captured" : "No voice note",
    });

    // Reset form fields
    setTitle("");
    setDescription("");
    setPhotoVideoFile(null);
    setVoiceNote(null);
    alert("Complaint submitted successfully!");
  };

  const handleVoiceNoteRecord = () => {
    alert("Voice recording feature is not yet implemented.");
    setVoiceNote("temporary-voice-note-data"); // Simulate a recorded voice note
  };

  return (
    <>
      <style>
        {`
          /* CSS Variables for easier theme management */
          :root {
            --bg-color: #f3f4f6;
            --text-color: #1f2937;
            --secondary-text-color: #4b5563;
            --accent-color: #2563eb;
            --white-color: #fff;
            --shadow-light: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          /* Base Styles */
          .page-container {
            min-height: 100vh;
            background-color: var(--bg-color);
            font-family: ui-sans-serif, system-ui, sans-serif;
            display: flex;
            flex-direction: column;
          }

          /* Header Styles */
          .site-header {
            background-color: #1f2937; /* Dark background for header */
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
            color: var(--white-color);
          }

          /* Complaint Form Styles */
          .complaint-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5rem;
            
          }

          .form-card {
            background-color: var(--white-color);
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: var(--shadow-md);
            max-width: 600px;
            width: 100%;
          }

          .motivational-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .header-title {
            font-size: 1.875rem;
            font-weight: 800;
            color: var(--text-color);
            margin-bottom: 0.5rem;
            letter-spacing: -0.025em;
          }

          .header-subtitle {
            color: #6b7280;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .form-input, .form-textarea, .file-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            color: var(--text-color);
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }

          .form-input:focus, .form-textarea:focus, .file-input:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
          }

          .form-textarea {
            resize: vertical;
            min-height: 120px;
          }

          .submit-button, .voice-note-button {
            width: 100%;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out;
            margin-top: 0.5rem;
          }
          
          .voice-note-button {
            background-color: #4b5563;
            color: #fff;
          }

          .submit-button {
            background-color: var(--accent-color);
            color: var(--white-color);
          }

          .submit-button:hover {
            background-color: #1d4ed8;
          }
          
          .voice-note-button:hover {
            background-color: #374151;
          }

          .submit-button:active, .voice-note-button:active {
            transform: scale(0.98);
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
        <div className="complaint-container">
          <div className="form-card">
            <div className="motivational-header">
              <h1 className="header-title">Make a difference, one report at a time!</h1>
              <p className="header-subtitle">Your voice helps build a better community for everyone.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Issue Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Detailed Description (Text)</label>
                <textarea
                  id="description"
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="file-upload" className="form-label">Attach Photo or Video</label>
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  accept="image/*,video/*"
                  onChange={(e) => setPhotoVideoFile(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Record Voice Note</label>
                <button
                  type="button"
                  className="voice-note-button"
                  onClick={handleVoiceNoteRecord}
                >
                  Start Recording
                </button>
                {voiceNote && <p className="text-sm mt-2">Voice note recorded!</p>}
              </div>
              <button type="submit" className="submit-button">
                Report Issue
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ComplaintPage;