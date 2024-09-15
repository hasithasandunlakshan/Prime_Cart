'use client'
import React, { useEffect, useState } from 'react'

import ProductCard from '../product/productCard'
import { useSession } from 'next-auth/react'
import { any } from 'zod'
import { Products } from '@/sample/Products'

export default function Hero() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  // async function fetchData() {
  //   try {
  //     const response = await fetch('https://gitcdn.link/cdn/seebham/ecommerce-dummy-data/main/data.json', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       console.log("API request failed, using local data.");
  //       setData(products); // Use local data as fallback
  //       return;
  //     }

  //     const datasample = await response.json();
  //     setData(datasample);
  //   } catch (error) {
  //     console.log("Error fetching data, using local data:", error);
  //     setData(products); // Use local data on error
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className='z-0 min-h-screen'>
      <div className="grid grid-cols-4 gap-5">
        {Products.map((product, key) => (
          <ProductCard key={key}  product={product} />
        ))}
      </div>
    </div>
  );
}
