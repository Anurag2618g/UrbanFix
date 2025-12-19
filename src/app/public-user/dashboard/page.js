'use client'

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../style/au-dashboard.module.css";

const FAKE_ISSUES = [
  {
    id: "FAKE-1",
    issueTitle: "Road Pothole on Main Street",
    textDescription:
      "Large pothole causing traffic issues and vehicle damage",
    issueCategory: "infrastructure",
    createdAt: "2024-09-20",
    fake: true
  },
  {
    id: "FAKE-2",
    issueTitle: "Street Light Not Working",
    textDescription:
      "Street light has been out for 2 weeks, safety concern",
    issueCategory: "utilities",
    createdAt: "2024-09-18",
    fake: true
  },
  {
    id: "FAKE-3",
    issueTitle: "Garbage Collection Missed",
    textDescription:
      "Garbage not collected for 3 days in residential area",
    issueCategory: "waste",
    createdAt: "2024-09-15",
    fake: true
  },
  {
    id: "FAKE-4",
    issueTitle: "Water Supply Issue",
    textDescription:
      "Low water pressure reported by multiple residents",
    issueCategory: "utilities",
    createdAt: "2024-09-22",
    fake: true
  }
];

export default function Home() {
  const [civicIssues, setCivicIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues");
        const realIssues = await res.json();

        // Real issues first, fake ones after
        setCivicIssues([
          ...realIssues.reverse(),
          ...FAKE_ISSUES
        ]);
      } catch (err) {
        console.error("Failed to fetch issues", err);
        setCivicIssues(FAKE_ISSUES);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CivicConnect - Public Issues Platform</title>
        <meta
          name="description"
          content="Report and track civic issues in your community"
        />
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
            <Link href="/public-user/dashboard" className={styles.navLink}>
              Home
            </Link>
            <Link href="/public-user/about" className={styles.navLink}>
              About
            </Link>
            <Link href="/public-user/feedback" className={styles.navLink}>
              Feedback
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.actionCard}>
              <h3>Quick Actions</h3>
              <div className={styles.actionButtons}>
                <Link
                  href="/public-user/reporting_issue"
                  className={styles.actionButton}
                >
                  <div className={styles.buttonIcon}>📝</div>
                  <span>Report Issue</span>
                </Link>

                <Link href="/my-feedback" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>💬</div>
                  <span>My Feed</span>
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

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.issuesCard}>
              <h3>Recent Civic Issues</h3>

              <div className={styles.issuesContainer}>
                {loading && <p>Loading issues...</p>}

                {!loading &&
                  civicIssues.map((issue) => (
                    <div key={issue.id} className={styles.issueItem}>
                      <div className={styles.issueHeader}>
                        <h4>{issue.issueTitle}</h4>

                        <span
                          className={`${styles.status} ${
                            issue.fake
                              ? styles.resolved
                              : styles.reported
                          }`}
                        >
                          {issue.fake ? "In progress" : "Reported"}
                        </span>
                      </div>

                      <p className={styles.issueDescription}>
                        {issue.textDescription ||
                          "No description provided"}
                      </p>

                      <div className={styles.issueFooter}>
                        <span className={styles.issueLocation}>
                          🗂️ {issue.issueCategory}
                        </span>
                        <span className={styles.issueDate}>
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 CivicConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
