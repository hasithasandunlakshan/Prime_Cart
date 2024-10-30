// pages/contact_us.js
import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.description}>
        We’d love to hear from you! Reach out to us through the following channels:
      </p>
      <div className={styles.contactDetails}>
        <p><FaEnvelope className={styles.icon} /> <strong>Email:</strong> prime_cart@gmail.com</p>
        <p><FaPhoneAlt className={styles.icon} /> <strong>Phone:</strong> 0212260000</p>
        <p><FaMapMarkerAlt className={styles.icon} /> <strong>Address:</strong> 1234 NewStreet, Colombo-13, Srilanka</p>
      </div>
    </div>
  );
};

export default ContactUs;
