'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../product/productCard';
import { useSession } from 'next-auth/react';

import CategoryCard from '../product/CategoryCard';
import Loading from '../Loading/loading';
import  Skeleton  from '@/components/Loading/skelton';

export default function allproducts() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  async function fetchData() {
    try {
      const response = await fetch('/api/allproducts', {
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
      <div className='container relative z-0 flex flex-col items-center justify-start min-h-screen align-top '>
      <h1 className='absolute top-0  text-slate-800 items-start justify-start w-[95%] text-6xl font-bold'>All products</h1>
    
    {/* Add a horizontal line below the title */}
    <hr className='w-[90%] mt-16 mb-2 border-t-2 border-gray-600' /> {/* Adjust margin and border thickness */}

        {loading ? (
        <div className="grid w-full grid-cols-4 gap-4"> {/* Change grid-cols to 4 to create 8 loaders */}
        {[...Array(8)].map((_, index) => (
            <Skeleton key={index} /> // Render 8 skeleton loaders
        ))}
    </div>
        ) : (
          <div className="z-0 grid grid-cols-4 gap-5 mt-10">
            {data.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </div>
        )}
      </div>

  
      
    </>
  );
}
