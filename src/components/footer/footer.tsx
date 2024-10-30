import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src="images/logo.png" alt="Logo" className={styles.logo} />
      </div>

      {/* Links */}
      <div className={styles.linksContainer}>
        <a href="/about_us" className={styles.link}>About Us</a>
        <a href="/contact_us" className={styles.link}>Contact Us</a>
        <a href="/privacy_policy" className={styles.link}>Privacy Policy</a>
        <a href="/term" className={styles.link}>Terms & Conditions</a>
      </div>

      {/* Social Media Icons */}
      <div className={styles.socialContainer}>
        <a href="https://facebook.com" className={styles.icon}>Facebook</a>
        <a href="https://instagram.com" className={styles.icon}>Instagram</a>
        <a href="https://twitter.com" className={styles.icon}>Twitter</a>
      </div>

      {/* Copyright */}
      <p className={styles.copyright}>© {new Date().getFullYear()} Prime_cart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
