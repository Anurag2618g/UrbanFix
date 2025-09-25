"use client"; // Client component directive
import './main.css';
import Link from "next/link";
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const inspirationStories = [
    {
      title: "Community Garden Success",
      content: "Local residents transformed an abandoned lot into a thriving community garden, bringing neighbors together and providing fresh produce for families in need.",
      author: "Bhargav"
    },
    {
      title: "Street Light Renovation Initiative",
      content: "Neighborhood fixed broken streetlights through volunteer efforts and municipal support, improving safety, awareness, and community participation.",
      author: "Anurag gupta"
    },
    {
      title: "Clean River Campaign",
      content: "Citizens organized river cleanups, planted trees, raised awareness, reduced pollution, and restored local wildlife and public health.",
      author: "Devendra Pratap Singh"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % inspirationStories.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [inspirationStories.length]);

  return (
<<<<<<< HEAD:Frontend/src/app/page.js
    <div className="home-container">
      <h1>Civic Issue Portal</h1>
      <p>Select your login type:</p>
      <Link href="/public-user/login">
        <button className="citizen-btn">Public Login</button>
      </Link>
      <Link href="/authority/login">
        <button className="authority-btn">Authority Login</button>
      </Link>
      <Link href="/public-user/dashboard">
      <button>public dashboard</button>
      </Link>
      <Link href="/authority/components/home">
      <button>authority dashboard</button>
      </Link>
=======
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo"><h2>CivicHub</h2></div>
          <div className="nav-buttons">
            <Link href="/public-user/login" className="nav-btn public-btn">Public</Link>
            <a href="/authority/login" className="nav-btn authority-btn">Authority</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Building Better Communities Together</h1>
          <p className="hero-description">
            Connect with your local government, report issues, and make your voice heard. 
            Join thousands of citizens working towards positive change.
          </p>
          <div className="hero-buttons">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <h3>📊 Impact This Month</h3>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">247</span>
                <span className="stat-label">Issues Resolved</span>
              </div>
              <div className="stat">
                <span className="stat-number">1,834</span>
                <span className="stat-label">Active Citizens</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Civic Issues Section */}
      <section className="civic-issues">
        <div className="container">
          <h2 className="section-title">Fix Civic Issues</h2>
          <div className="issues-grid">
            <div className="issue-card">
              <div className="issue-icon">🚧</div>
              <h3>Infrastructure</h3>
              <p>Report road damages, broken streetlights, water leaks, and other infrastructure problems in your neighborhood.</p>
              <button className="issue-btn">Report Issue</button>
            </div>
            <div className="issue-card">
              <div className="issue-icon">🌳</div>
              <h3>Environment</h3>
              <p>Address environmental concerns including pollution, waste management, and green space maintenance.</p>
              <button className="issue-btn">Report Issue</button>
            </div>
            <div className="issue-card">
              <div className="issue-icon">👥</div>
              <h3>Community</h3>
              <p>Improve community services, safety concerns, and public facility issues that affect daily life.</p>
              <button className="issue-btn">Report Issue</button>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Stories Section */}
      <section className="inspiration-section">
        <div className="container">
          <h2 className="section-title">Inspiration Stories</h2>
          <div className="story-container">
            <div className="story-card">
              <h3>{inspirationStories[currentStory].title}</h3>
              <p>{inspirationStories[currentStory].content}</p>
              <div className="story-author">— {inspirationStories[currentStory].author}</div>
            </div>
            <div className="story-indicators">
              {inspirationStories.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentStory ? 'active' : ''}`}
                  onClick={() => setCurrentStory(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CivicHub</h3>
              <p>Empowering citizens to build better communities through civic engagement and transparency.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/feedback">Feedback</a></li>
                <li><a href="/community">Community</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CivicHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
>>>>>>> main:src/app/page.js
    </div>
  );
};

export default HomePage;
