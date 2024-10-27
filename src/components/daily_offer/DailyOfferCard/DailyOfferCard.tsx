

import React from 'react';
import './DailyOfferCard.css'; // Import the CSS file

// Define the structure of an offer
interface Offer {
    id: number;
    title: string;
    description: string;
    imageUrl: string; // Ensure this matches your database column names
}

// Define props for DailyOfferCard component
interface DailyOfferCardProps {
    offer: Offer;
}

// Create the DailyOfferCard component
const DailyOfferCard: React.FC<DailyOfferCardProps> = ({ offer }) => {
    const handleButtonClick = () => {
        // Define your button click action here
        console.log(`Offer ${offer.id} clicked`);
    };

    return (
        <div className="card">
            <img src={offer.imageUrl} alt={offer.title} className="image" />
            <h2 className="cardTitle">{offer.title}</h2>
            <p className="description">{offer.description}</p>
            <button className="button" onClick={handleButtonClick}>
                Shop Now
            </button>
        </div>
    );
};

export default DailyOfferCard;
