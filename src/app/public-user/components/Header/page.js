import Link from 'next/link';
import { useState } from 'react';
import styles from '../../../style/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            🏛️ <span>CivicConnect</span>
          </Link>
        </div>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/public-user/dashboard" className={styles.navLink}>Home</Link>
          <Link href="/public-user/about" className={styles.navLink}>About</Link>
          <Link href="/public-user/feedback" className={styles.navLink}>Feedback</Link>
        </nav>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
