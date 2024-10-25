'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../product/productCard';
import { useSession } from 'next-auth/react';
import BannerCarousel from './BannerCarousel';
import CategoryCard from '../product/CategoryCard';
import Loading from '../Loading/loading';

export default function Hero() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const Categories = [
    {
      title: "Smartphones",
      description:
        "Mobile phones that combine cellular and mobile computing functions.",
      imageUrl:
        "https://img.freepik.com/premium-photo/digital-mobile-platform-modern-gadgets-with-neon-light-background_1205263-92134.jpg?w=2000",
    },
    {
      title: "Laptops",
      description: "Portable personal computers for mobile use.",
      imageUrl:
        "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1726775914~exp=1726779514~hmac=7a6d3b42d0f399e42b5f0cdb226c1e064dabd017e2923e884cc1d2c2492ad1c9&w=2000",
    },
    {
      title: "Tablets",
      description:
        "Portable touchscreen computers that are larger than smartphones.",
      imageUrl:
        "https://img.freepik.com/premium-photo/tablets-isolated-white-background-8k_1304645-24575.jpg?w=2000",
    },
    {
      title: "Headphones",
      description:
        "Audio devices worn on or over the ears to listen to music or audio.",
      imageUrl:
        "https://img.freepik.com/premium-photo/3d-rendering-brown-leather-headphones-brown-wooden-table-against-brown-background_1053268-16769.jpg?w=2000",
    },
    {
      title: "Televisions",
      description: "Electronic devices for viewing video content.",
      imageUrl:
        "https://img.freepik.com/free-photo/view-computer-monitor-display-with-desk_23-2150757515.jpg?t=st=1726776145~exp=1726779745~hmac=ffbb8f3a8523e2383d3f3eaed2a1d1a4d72c1191fd30da420b5f75ae080c488f&w=2000",
    },
    {
      title: "Cameras",
      description: "Devices used to capture images and videos.",
      imageUrl:
        "https://img.freepik.com/premium-photo/macro-photography-naturephotographer-tourists-taking-pictures-sunset-silhouette-time_1273307-1835.jpg?w=2000",
    },
    {
      title: "Tablets",
      description:
        "Portable touchscreen computers that are larger than smartphones.",
      imageUrl:
        "https://img.freepik.com/premium-photo/tablets-isolated-white-background-8k_1304645-24575.jpg?w=2000",
    },
    {
      title: "Headphones",
      description:
        "Audio devices worn on or over the ears to listen to music or audio.",
      imageUrl:
        "https://img.freepik.com/premium-photo/3d-rendering-brown-leather-headphones-brown-wooden-table-against-brown-background_1053268-16769.jpg?w=2000",
    },
  ];

  async function fetchData() {
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log("API request failed, using local data.");
        return;
      }

      const datasample = await response.json();
      setData(datasample);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log("Error fetching data, using local data:", error);
      setLoading(false); // Set loading to false even on error
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='z-0 flex flex-col items-center justify-center min-h-screen '>
        <BannerCarousel />
        
        {loading ? (
         <Loading/>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {data.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </div>
        )}
      </div>

      <div className="mx-10">
        <h1 className="mt-20 mb-10 text-3xl font-bold">Product Categories</h1>
        <div className="relative flex py-5 space-x-4 overflow-auto carousel">
          {Categories.map((category, key) => (
            <CategoryCard category={category} key={key} />
          ))}
        </div>
      </div>
    </>
  );
}
