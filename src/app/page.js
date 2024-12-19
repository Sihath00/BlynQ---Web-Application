import Image from 'next/image';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
  return (
      <div className={styles.container}>
        {/* Left Section */}
        <div className={`${styles.leftSection} ${styles.slideIn}`}>
          <div className={styles.brandContainer}>
            <h1 className={styles.heading}>
              Welcome to <span className={styles.highlight}>BlynQ</span>
            </h1>
            <p className={styles.subtext}>
              Streamline your service center operations with advanced tools for tracking,
              scheduling, and managing vehicles efficiently.
            </p>
          </div>
          <Image
              src="/login.png"
              alt="Service Center Illustration"
              width={500}
              height={500}
              className={`${styles.illustration}`}
              priority
          />
        </div>

        {/* Right Section */}
        <div className={`${styles.rightSection} ${styles.fadeIn}`}>
          <div className={styles.logoCircle}>
            <Image
                src="/img.png"
                alt="BlynQ Logo"
                width={120}
                height={120}
                className={styles.logoImage}
            />
          </div>

          <div className={styles.loginFormContainer}>
            <h2 className={styles.formHeading}>Login to Your Service Center</h2>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>
              <div className={styles.forgotPassword}>
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </form>
          </div>

          <footer className={styles.footer}>
            <p>
              Designed & Developed by <a href="#">BlynQ Technologies 2024</a>. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
  );
}