"use client";
import { useState } from "react";
import Header from './public-user/Navigation';
const ResolvedIssueItem = ({ issue, onVote }) => {
  return (
   
    <div className="resolved-card">
         <Header />
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
          .page-container {
            min-height: 100vh;
            background-color: #f3f4f6;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }
          /* Resolved Page Styles */
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
        `}
      </style>
      <div className="page-container">
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
    </>
  );
};

export default ResolvedPage;
