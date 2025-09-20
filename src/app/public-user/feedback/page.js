"use client";
import { useState } from "react";

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
          .page-container {
            min-height: 100vh;
            background-color: #f3f4f6;
            font-family: ui-sans-serif, system-ui, sans-serif;
            padding: 2rem 1rem;
          }
          /* Feedback Page Styles */
          .feedback-container {
            max-width: 600px;
            margin: 2rem auto;
            background-color: #fff;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
        `}
      </style>
      <div className="page-container">
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
      </div>
    </>
  );
};

export default FeedbackPage;
