"use client";
import React, { useState } from 'react';
import styles from './payment.module.css';

const Checkout = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState(''); 
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(`Payment of Rs${amount} Successfully completed.`);
    setName('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setAmount(''); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Payment</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.h2}>Pay with: </h2>
        <div className={styles.paymentMethods}>
          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card
          </label>
          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="bankTransfer"
              checked={paymentMethod === 'bankTransfer'}
              onChange={() => setPaymentMethod('bankTransfer')}
            />
            Bank Transfer
          </label>
          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="cryptocurrency"
              checked={paymentMethod === 'cryptocurrency'}
              onChange={() => setPaymentMethod('cryptocurrency')}
            />
            Cryptocurrency
          </label>
          
        </div>

        <img src="/visa.jpg" alt="Visa" className={styles.icon} />
        <div className={styles.formGroup}>
          <label className={styles.label}>Card Number:</label>
          <input
            className={styles.input}
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Expiration Date:</label>
          <input
            className={styles.input}
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>CVV:</label>
          <input
            className={styles.input}
            type="password"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amount:</label>
          <input
            className={styles.input}
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Pay Rs. {amount}</button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default Checkout;



