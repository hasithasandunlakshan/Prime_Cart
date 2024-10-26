"use client";

import { useEffect, useState } from 'react';
import styles from '@/components/profile/Profile.module.css'; 
import Image from "next/image";

const Profile = () => {
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch names');
        }
        const data = await response.json();
        setNames(data);
        if (data.length > 0) {
          setFirstName(data[0].firstName);
          setLastName(data[0].lastName);
        } 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNames();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update names');
      }

      // Optionally, refresh the data
      const updatedData = await response.json();
      setNames(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!names.length) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <h3 className={styles.heading2}>My Profile</h3>

      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <Image src="/user.jpg" alt="Profile Picture" fill className={styles.img} />
        </div>

        <div className={styles.formcontainer}>
          <div>
            <label className={styles.labels}>First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
              />
            ) : (
              <ul className={styles.userList}>
                {names.map((user) => (
                  <li key={user.userId} className={styles.userListItem}>
                    {user.firstName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {isEditing ? (
              <button className={styles.button} onClick={handleSave}>Save</button>
            ) : (
              <button className={styles.button} onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>

        <div className={styles.formcontainer}>
          <div>
            <label className={styles.labels}>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.input}
              />
            ) : (
              <ul className={styles.userList}>
                {names.map((user) => (
                  <li key={user.userId} className={styles.userListItem}>
                    {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {isEditing ? (
              <button className={styles.button} onClick={handleSave}>Save</button>
            ) : (
              <button className={styles.button} onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.formcontainer}>
          <label className={styles.labels}>To add New Address to My Profile</label>
        
          <div>
            <button className={styles.button}>Click here</button>
          </div>

        </div>
        
      </div>

      
    </div>
  );
};

export default Profile;


