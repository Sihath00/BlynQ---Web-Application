import Image from 'next/image';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
  return (
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.brandContainer}>
            <h1>
              Welcome to <span className={styles.highlight}>BlynQ</span>
            </h1>
            <p>git
              Streamline your service center operations with advanced tools for tracking,
              scheduling, and managing vehicles.
            </p>
          </div>
          <Image
              src="/login.png"
              alt="Service Center Illustration"
              width={500}
              height={500}
              className={styles.illustration}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Logo Circle */}
          <div className={styles.logoCircle}>
            <Image
                src="/img.png"
                alt="BlynQ Logo"
                width={150}
                height={150}
            />
          </div>

          {/* Login Form */}
          <div className={styles.loginFormContainer}>
            <h2>Login</h2>
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

          {/* Footer */}
          <footer className={styles.footer}>
            Designed & Developed by <a href="#">BlynQ Technologies 2024</a> All rights reserved.
          </footer>
        </div>
      </div>
  );
}
