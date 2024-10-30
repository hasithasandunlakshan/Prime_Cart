"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Offer {
  offerId: number;
  productId: number;
  imageUrl: string;
  title: string;
  description: string;
}

const DailyOffer: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/DailyOffer`);
        const revenueData = await response.json();
        const offerList: Offer[] = revenueData[0];
        setOffers(offerList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOfferClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <div className="py-44">
        <h1 className="text-4xl font-bold mb-8 text-center">Daily Offers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.productId}
              onClick={() => handleOfferClick(offer.productId)}
              className="card p-5 rounded-lg bg-gray-50 shadow-md cursor-pointer"
            >
              <img src={`/${offer.imageUrl}`} alt={offer.title} className="w-full h-full object-cover rounded-md mb-4" />
              <h3 className="font-bold text-xl">{offer.title}</h3>
              <p className="text-gray-800 mt-2 test-xl bg-blue-100 border-l-4 border-blue-500 p-3 rounded-lg flex items-center">
                <span className="material-icons text-blue-500 mr-2 font-bold">{offer.description}</span>
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyOffer;
