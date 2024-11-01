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
        const response = await fetch(`/api/DailyOffer`);
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
      <div className="flex flex-col items-center justify-center min-h-screen align-middle">
        <h1 className="items-start justify-start mb-5 text-6xl font-bold text-slate-800 ">Daily Offers</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.productId}
              onClick={() => handleOfferClick(offer.productId)}
              className="p-5 rounded-lg shadow-md cursor-pointer card bg-gray-50"
            >
              <img src={`/${offer.imageUrl}`} alt={offer.title} className="object-cover w-full h-full mb-4 rounded-md" />
              <h3 className="text-xl font-bold">{offer.title}</h3>
              <p className="flex items-center p-3 mt-2 text-gray-800 bg-blue-100 border-l-4 border-blue-500 rounded-lg test-xl">
                <span className="mr-2 font-bold text-blue-500 material-icons">{offer.description}</span>
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyOffer;
