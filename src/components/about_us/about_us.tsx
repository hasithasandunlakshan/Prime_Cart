import React from 'react';
import './about_us.css'; // Import CSS for styling

const AboutUs = () => {
    return (
        <div className="aboutUsContainer">
            <h1>About Us</h1>
            <p>
                Welcome to <strong>C</strong> – your go-to destination for top-quality laptops and mobile devices! As a family-owned retailer based in Texas, we have built a reputation for providing exceptional products and reliable service.
            </p>
            <h2>Our Focus</h2>
            <p>
                At C, we specialize in a curated selection of the latest laptops and smartphones from leading brands. Whether you're a tech enthusiast, a student, or a professional, we have the perfect device to meet your needs.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
                <li><strong>Quality Products:</strong> We only offer devices that meet our high standards of quality and performance.</li>
                <li><strong>Competitive Prices:</strong> Get the best value for your money with our affordable pricing.</li>
                <li><strong>Expert Support:</strong> Our knowledgeable team is here to assist you in finding the right product.</li>
            </ul>
            <h2>Your Shopping Experience</h2>
            <p>
                Shopping with us is easy and convenient. Browse our selection online, add your favorite products to your cart, and enjoy fast delivery right to your door. Your satisfaction is our priority!
            </p>
            <h2>Join Our Community</h2>
            <p>
                Thank you for considering C for your tech needs. We look forward to serving you and becoming your trusted partner in technology!
            </p>
            <div className="footer">
                <p>– The C Family</p>
            </div>
        </div>
    );
};

export default AboutUs;
