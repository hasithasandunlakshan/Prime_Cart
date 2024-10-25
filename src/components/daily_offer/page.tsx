// components/daily_offer/DailyOfferPage.js

import React from 'react';
import styles from './daily_offer.module.css';
import DailyOfferCard from '@/components/daily_offer/DailyOfferCard/DailyOfferCard';
import LapTwentyoff from './DailyOfferCard/images/20-off.webp';
import Household30OFF from './DailyOfferCard/images/Household30.webp';
import headphone from './DailyOfferCard/images/headphoneBuy1Get1.webp';



const DailyOfferPage = () => {
    const offers = [
        {
            id: 1,
            title: "20% Off on Laptops & Accessories",
            description: "Get 20% off on all laptops, chargers, and other accessories. Limited time offer!",
            imageUrl: LapTwentyoff.src,
        },
        {
            id: 2,
            title: "Buy 1 Get 1 Free on Headphones",
            description: "Purchase any pair of headphones and get another one for free. Great sound, twice the fun!",
            imageUrl: headphone.src,
        },
        {
            id: 3,
            title: "30% Off on Smart Home Devices",
            description: "Upgrade your home with smart devices at a 30% discount. Limited stock!",
            imageUrl: Household30OFF.src,
        },
    ];

    const handleButtonClick = (id: number) => {
        console.log(`Offer ${id} clicked`); // Replace with your desired action
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Today's Special Offers</h1>
            <div className={styles.offerList}>
                {offers.map((offer) => (
                    <DailyOfferCard key={offer.id} offer={offer} />
                ))}
            </div>
        </div>
    );
};

export default DailyOfferPage;
