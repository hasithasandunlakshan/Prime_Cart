"use client";

import { useEffect, useState } from 'react';
import styles from './Profile.module.css'; 
import Image from "next/image";

const Profile = () => {
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch names');
        }
        const data = await response.json();
        setNames(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNames();
  }, []);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!names.length) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h3 className={styles.heading2}>My Profile</h3>
      </div>

      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <Image src="/user.jpg" alt="Profile Picture" fill className={styles.img} />
        </div>

        <div className={styles.formcontainer}>
          <label className={styles.labels}>First Name</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.firstName}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Address No</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrNo}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Address Line 1</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrLine1}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Address Town</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrTown}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Province</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrProvince}
              </li> 
            ))}
          </ul>

          
        </div>

        <div className={styles.formcontainer}>
          <label className={styles.labels}>Last Name</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.lastName}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Address Street</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrStreet}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Address Line 2</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrLine2}
              </li> 
            ))}
          </ul>
          
          <label className={styles.labels}>District</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.addrDistrict}
              </li> 
            ))}
          </ul>

          <label className={styles.labels}>Postal Code</label>
          <ul className={styles.userList}>
            {names.map((user) => (
              <li key={user.userId} className={styles.userListItem}>
                {user.postalCode}
              </li> 
            ))}
          </ul>
        </div>
      </div>

      

      <div className={styles.buttonContainer}>
        <button className={styles.button}>Update My Profile!</button>
      </div>
    </div>
  );
};

export default Profile;
