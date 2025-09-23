"use client";  // ⚠️ Required for React hooks

import { useState } from "react";

import Head from 'next/head';
import Footer from '../../public-user/components/Footer/page.js';
import Header from '../../public-user/components/Header/page.js';

import styles from '../../style/Feedback.module.css';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <>
        <Head>
          <title>Feedback Submitted - CivicConnect</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h1>Thank You!</h1>
              <p>Your feedback has been submitted successfully. We appreciate your input!</p>
              <button 
                className={styles.submitBtn}
                onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({
                    name: '',
                    email: '',
                    category: '',
                    message: '',
                    rating: 5
                  });
                }}
              >
                Submit More Feedback
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Feedback - CivicConnect</title>
        <meta name="description" content="Share your feedback about CivicConnect" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <h1>💬 Share Your Feedback</h1>
            <p>Help us improve CivicConnect with your valuable input</p>
          </section>

          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="category">Feedback Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Select Category</option>
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="usability">Usability</option>
                <option value="performance">Performance</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="rating">Overall Rating</label>
              <div className={styles.ratingGroup}>
                {[1, 2, 3, 4, 5].map(num => (
                  <label key={num} className={styles.ratingLabel}>
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={formData.rating == num}
                      onChange={handleInputChange}
                    />
                    <span className={styles.star}>⭐</span>
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Your Feedback</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                className={styles.textarea}
                placeholder="Share your thoughts, suggestions, or report issues..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
            >
              {isSubmitting ? '📤 Submitting...' : '📨 Submit Feedback'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}