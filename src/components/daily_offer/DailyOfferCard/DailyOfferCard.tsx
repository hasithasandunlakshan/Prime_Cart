// components/daily_offer/DailyOfferCard/DailyOfferCard.js
import React from 'react';
import '../DailyOfferCard/DailyOfferCard.css';

interface Offer {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

interface DailyOfferCardProps {
    offer: Offer;
}

const DailyOfferCard: React.FC<DailyOfferCardProps> = ({ offer }) => {
    return (
        <div className="card">
            <img src={offer.imageUrl} alt={offer.title} className="image" />
            <h2 className="cardTitle">{offer.title}</h2>
            <p className="description">{offer.description}</p>
            <button className="button">
                Shop Now
            </button>
        </div>
    );
};

export default DailyOfferCard;
