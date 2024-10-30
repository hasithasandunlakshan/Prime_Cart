import React from 'react';
import './term.css';

const terms = () => {
    return (
        <div className="termsContainer">
            <h1>Terms and Conditions</h1>
            <p>Welcome to Company C! By using our website, you agree to comply with the following terms and conditions.</p>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>

            <h2>2. Changes to Terms</h2>
            <p>We may update these terms from time to time. You are encouraged to review this page periodically for any changes.</p>

            <h2>3. User Responsibilities</h2>
            <p>As a user, you agree to:</p>
            <ul>
                <li>Provide accurate information when creating an account.</li>
                <li>Keep your account information confidential.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>

            <h2>4. Payment and Refunds</h2>
            <p>Payments are processed securely. We offer refunds as per our refund policy, which can be found on our website.</p>

            <h2>5. Limitation of Liability</h2>
            <p>Company C is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

            <h2>6. Governing Law</h2>
            <p>These terms are governed by the laws of the state of Texas. Any disputes will be resolved in accordance with these laws.</p>

            <div className="footer">Last updated: [30/10/2024]</div>
        </div>
    );
};

export default terms;
