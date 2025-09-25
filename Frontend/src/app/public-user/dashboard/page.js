// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../style/au-dashboard.module.css';


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
                ))}
              </div>
            </div>
          </div>
        </div>
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
