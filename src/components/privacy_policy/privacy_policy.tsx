import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacyPolicyContainer">
            <h1>Privacy Policy</h1>
            <p>At Company C, we value your privacy. This policy outlines how we handle your information.</p>
            <h2>Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
                <li>Personal Information: Name, email, phone number, etc.</li>
                <li>Payment Information: Credit card details, billing address, etc.</li>
                <li>Usage Data: Information about how you use our platform.</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>Your information is used for:</p>
            <ul>
                <li>Processing orders and transactions.</li>
                <li>Improving customer service and support.</li>
                <li>Sending periodic emails about your order or other products and services.</li>
            </ul>
            <h2>Security of Your Information</h2>
            <p>We take appropriate security measures to protect your personal information from unauthorized access, use, or disclosure.</p>
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            <div className="footer">Last updated: [30/10/2024]</div>
        </div>
    );
};

export default PrivacyPolicy;
