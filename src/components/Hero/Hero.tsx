'use client'
import React, { useEffect, useState } from 'react'

import ProductCard from '../product/productCard'
import { useSession } from 'next-auth/react'
import { any } from 'zod'
import { Products } from '@/sample/Products'
import BannerCarousel from './BannerCarousel'
import CategoryCard from '../product/CategoryCard'

export default function Hero() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const items = [
    {
      imageUrl:
        "https://img.freepik.com/premium-photo/highresolution-8k-render-laptop-coffee-cup-desk-with-red-gradient-theme_976564-10039.jpg?w=1800",
      id: "1",
      title: "Gaming Laptop",
      description: "A powerful gaming laptop with high-end specs.",
      price: 1500,
      rating: 4.8,
    },
    {
      imageUrl:
        "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147843161.jpg?t=st=1726769413~exp=1726773013~hmac=b0dc86537cad2fd0493bf374b5243c979ced07e413432379a864ff18e9ffe328&w=1800",
      id: "2",
      title: "Smartphone",
      description: "A sleek smartphone with an excellent camera.",
      price: 800,
      rating: 3.2,
    },
    {
      imageUrl:
        "https://img.freepik.com/free-photo/still-life-wireless-cyberpunk-headphones_23-2151072207.jpg?t=st=1726769621~exp=1726773221~hmac=a601e9b5c3647e38b7dcb4d6ab599a17d871aa74f1b2e664cf7707dc02b9d298&w=1380",
      id: "3",
      title: "Wireless Headphones",
      description:
        "Noise-cancelling wireless headphones with long battery life.",
      price: 200,
      rating: 3.7,
    },
    {
      imageUrl:
        "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039316.jpg?t=st=1726769679~exp=1726773279~hmac=0842787a3f3e0817cbb97a97ccb59ea84a29563a11bc6166f4e181658c8c0f21&w=2000",
      id: "4",
      title: "Smartwatch",
      description: "Track your fitness and notifications with this smartwatch.",
      price: 250,
      rating: 2.3,
    },
  ];

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
      // Use local data as fallback
        return;
      }

      const datasample = await response.json();
      setData(datasample);
      console.log(data);
    } catch (error) {
      console.log("Error fetching data, using local data:", error);
      // Use local data on error
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='z-0 flex flex-col items-center justify-center min-h-screen '>
      <BannerCarousel/>
     

      
    
      <div className="grid grid-cols-4 gap-5">
        {data.map((product, key) => (
        
      <ProductCard product={product}/>
        ))}
      </div>
    </div>

    <div className="mx-10 ">
        <h1 className="mt-20 mb-10 text-3xl font-bold">Product Categories</h1>
        <div className="relative flex py-5 space-x-4 overflow-auto carousel ">
          {Categories.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>

     
      </div>
    </>
  
  );
}
