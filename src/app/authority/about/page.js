// pages/about.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../style/About.module.css';

export default function About() {
  const authorities = [
    {
      name: "Municipal Corporation",
      description: "Handles water supply, sewerage, waste management, street lighting, and road maintenance",
      contact: "municipal@city.gov.in",
      phone: "+91-XXXX-XXXXXX"
    },
    {
      name: "Traffic Police Department",
      description: "Manages traffic violations, road safety, parking issues, and traffic signal problems",
      contact: "traffic@police.gov.in",
      phone: "+91-XXXX-XXXXXX"
    },
    {
      name: "Public Works Department",
      description: "Infrastructure development, road construction, building maintenance, and public facilities",
      contact: "pwd@state.gov.in",
      phone: "+91-XXXX-XXXXXX"
    },
    {
      name: "Health Department",
      description: "Public health issues, sanitation, hospital services, and health emergency responses",
      contact: "health@city.gov.in",
      phone: "+91-XXXX-XXXXXX"
    },
    {
      name: "Fire Department",
      description: "Fire safety, emergency response, building safety clearances, and disaster management",
      contact: "fire@emergency.gov.in",
      phone: "101"
    },
    {
      name: "Environmental Department",
      description: "Pollution control, environmental clearances, tree cutting permissions, and waste disposal",
      contact: "environment@state.gov.in",
      phone: "+91-XXXX-XXXXXX"
    }
  ];

  const issueTypes = [
    {
      category: "Infrastructure",
      issues: ["Road potholes", "Street lighting", "Water supply", "Sewerage problems", "Broken footpaths"]
    },
    {
      category: "Public Safety",
      issues: ["Traffic violations", "Unsafe buildings", "Crime reporting", "Emergency services", "Fire hazards"]
    },
    {
      category: "Environment",
      issues: ["Garbage collection", "Air pollution", "Noise pollution", "Tree cutting", "Water pollution"]
    },
    {
      category: "Public Services",
      issues: ["Healthcare facilities", "Education services", "Public transport", "Document services", "Utility bills"]
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>About - CivicConnect Authority Platform</title>
        <meta name="description" content="Learn about our civic issues reporting platform and the authorities involved" />
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
            <Link href="/authority/dashboard" className={styles.navLink}>Home</Link>
            <Link href="/authority/about" className={`${styles.navLink} ${styles.active}`}>About</Link>
            <Link href="/authority/feedback" className={styles.navLink}>Feedback</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContainer}>
          
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1>About CivicConnect</h1>
              <p className={styles.heroDescription}>
                Your direct bridge to local authorities for reporting and resolving civic issues. 
                We connect citizens with the right government departments to ensure swift action 
                on community problems.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className={styles.missionSection}>
            <div className={styles.sectionContent}>
              <h2>Our Mission</h2>
              <div className={styles.missionGrid}>
                <div className={styles.missionCard}>
                  <div className={styles.missionIcon}>🎯</div>
                  <h3>Direct Communication</h3>
                  <p>Establish direct communication channels between citizens and local authorities for efficient problem resolution.</p>
                </div>
                <div className={styles.missionCard}>
                  <div className={styles.missionIcon}>⚡</div>
                  <h3>Quick Response</h3>
                  <p>Ensure rapid response times by routing issues directly to the responsible government departments.</p>
                </div>
                <div className={styles.missionCard}>
                  <div className={styles.missionIcon}>📊</div>
                  <h3>Transparency</h3>
                  <p>Maintain complete transparency in the issue resolution process with real-time status updates.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className={styles.processSection}>
            <div className={styles.sectionContent}>
              <h2>How It Works</h2>
              <div className={styles.processSteps}>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>1</div>
                  <h3>Report Issue</h3>
                  <p>Citizens report civic issues through our platform with photos, location, and detailed description.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>2</div>
                  <h3>Auto-Routing</h3>
                  <p>Our system automatically routes the issue to the appropriate authority based on the problem type.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>3</div>
                  <h3>Authority Action</h3>
                  <p>The concerned department receives the complaint and takes necessary action to resolve it.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>4</div>
                  <h3>Status Updates</h3>
                  <p>Citizens receive real-time updates on the progress and completion of their reported issues.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Authorities Section */}
          <section className={styles.authoritiesSection}>
            <div className={styles.sectionContent}>
              <h2>Connected Authorities</h2>
              <p className={styles.sectionDescription}>
                We work directly with various government departments to ensure your issues reach the right people.
              </p>
              <div className={styles.authoritiesGrid}>
                {authorities.map((authority, index) => (
                  <div key={index} className={styles.authorityCard}>
                    <h3>{authority.name}</h3>
                    <p>{authority.description}</p>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactItem}>
                        <span className={styles.contactIcon}>📧</span>
                        <span>{authority.contact}</span>
                      </div>
                      <div className={styles.contactItem}>
                        <span className={styles.contactIcon}>📞</span>
                        <span>{authority.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Issue Types */}
          <section className={styles.issueTypesSection}>
            <div className={styles.sectionContent}>
              <h2>Types of Issues We Handle</h2>
              <div className={styles.issueTypesGrid}>
                {issueTypes.map((type, index) => (
                  <div key={index} className={styles.issueTypeCard}>
                    <h3>{type.category}</h3>
                    <ul className={styles.issueList}>
                      {type.issues.map((issue, issueIndex) => (
                        <li key={issueIndex}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <div className={styles.sectionContent}>
              <h2>Our Impact</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>5,847</div>
                  <div className={styles.statLabel}>Issues Reported</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>4,923</div>
                  <div className={styles.statLabel}>Issues Resolved</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>72hrs</div>
                  <div className={styles.statLabel}>Average Response Time</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>84%</div>
                  <div className={styles.statLabel}>Resolution Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2>Ready to Make a Difference?</h2>
              <p>Join thousands of citizens who are actively improving their communities through CivicConnect.</p>
              <div className={styles.ctaButtons}>
                <Link href="/report-issue" className={styles.ctaButtonPrimary}>Report an Issue</Link>
                <Link href="/feedback" className={styles.ctaButtonSecondary}>Give Feedback</Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h4>CivicConnect</h4>
            <p>Bridging the gap between citizens and authorities for a better community.</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <Link href="/report-issue" className={styles.footerLink}>Report Issue</Link>
            <Link href="/track-issue" className={styles.footerLink}>Track Issue</Link>
            <Link href="/about" className={styles.footerLink}>About Us</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>
          
          <div className={styles.footerSection}>
            <h4>For Authorities</h4>
            <Link href="/authority-login" className={styles.footerLink}>Authority Login</Link>
            <Link href="/authority-dashboard" className={styles.footerLink}>Dashboard</Link>
            <Link href="/reports" className={styles.footerLink}>Reports</Link>
            <Link href="/analytics" className={styles.footerLink}>Analytics</Link>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <Link href="/help" className={styles.footerLink}>Help Center</Link>
            <Link href="/feedback" className={styles.footerLink}>Feedback</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 CivicConnect. All rights reserved. | In partnership with Government of India</p>
        </div>
      </footer>
    </div>
  );
}