"use client";
import { useState } from "react";
import Link from "next/link";
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
        <a href="/public-user/Complaints" className="nav-link">
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

const ComplaintPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoVideoFile, setPhotoVideoFile] = useState(null);
  const [voiceNote, setVoiceNote] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would upload the files and text to a server.
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
    // TODO: Add a confirmation message or redirect the user
  };

  const handleVoiceNoteRecord = () => {
    // This is a placeholder for a real voice recording feature.
    // In a real app, you would use the Web Audio API or a library to record audio.
    alert("Voice recording feature is not yet implemented.");
    setVoiceNote("temporary-voice-note-data"); // Simulate a recorded voice note
  };

  return (
    <>
      <style>
        {`
          /* Base Styles for the entire page */
          .page-container {
            min-height: 100vh;
            background-color: #f3f4f6;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }

          /* Header Styles (copied from page.jsx) */
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
          
          /* Form Styles */
          .complaint-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5rem;
          }

          .form-card {
            background-color: #fff;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
            color: #1f2937;
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
            color: #1f2937;
            transition-property: border-color, box-shadow;
            transition-duration: 0.15s;
          }

          .form-input:focus, .form-textarea:focus, .file-input:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-color: #2563eb;
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
            transition-property: background-color, transform;
            transition-duration: 0.15s;
          }

          .submit-button {
            background-color: #2563eb;
            color: #fff;
          }

          .submit-button:hover {
            background-color: #1d4ed8;
          }

          .submit-button:active {
            transform: scale(0.98);
          }
          
          .voice-note-button {
            background-color: #4b5563;
            color: #fff;
          }

          .voice-note-button:hover {
            background-color: #374151;
          }

          .file-input {
            background-color: #fff;
          }

          .file-input-label {
            cursor: pointer;
            display: inline-block;
            background-color: #6b7280;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
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
      </div>
    </>
  );
};

export default ComplaintPage;
