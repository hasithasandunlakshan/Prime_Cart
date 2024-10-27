

"use client"; 

import React, { useEffect, useState } from 'react';
import styles from './daily_offer.module.css';
import DailyOfferCard from '@/components/daily_offer/DailyOfferCard/DailyOfferCard';

interface Offer {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const DailyOfferPage: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch daily offers from the API
    useEffect(() => {
        const fetchDailyOffers = async () => {
            try {
                const response = await fetch('/api/dailyOffers'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch offers');
                }
                const data: Offer[] = await response.json(); // Specify the expected data type
                setOffers(data); // Assuming data is an array of offers
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                console.error('Error fetching daily offers:', err);
            }
        };

        fetchDailyOffers();
    }, []); // Empty dependency array to run only on mount

    const handleButtonClick = (id: number) => {
        console.log(`Offer ${id} clicked`); // Replace with your desired action
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Today's Special Offers</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.offerList}>
                {offers.length > 0 ? (
                    offers.map((offer) => (
                        <DailyOfferCard key={offer.id} offer={offer} />
                    ))
                ) : (
                    <p>No offers available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default DailyOfferPage;
