// app/search/page.tsx
"use client";
import ProductCard from '@/components/product/productCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage({ params }: { params: { query: string } }) {
  const [data, setData] = useState([]);
  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',params.query)
  async function fetchData() {
    try{
      const response =await fetch(`/api/search/${params.query}`,
       { method:'GET',
        headers: {
          'Content-Type': 'application/json',
      },
    
    }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data)
      console.log('API response:', data);
      // Process the response data as needed
      
    }
    
    catch(error){
      
    }
    
    
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Search Results for: {params.query ? params.query : 'No query provided'}</h1>
      <div className="grid grid-cols-4 gap-5">
        {data.map((product, key) => (
        
      <ProductCard product={product} key={key}/>
        ))}
      </div>
    </div>
  
  );
}
