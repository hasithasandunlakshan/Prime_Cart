// app/search/page.tsx
"use client";
import ProductCard from '@/components/product/productCard';
import SkeletonLoader from '@/components/Loading/skelton';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage({ params }: { params: { query: string } }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(`/api/search/${params.query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [params.query]);

  return (
    <div className='flex flex-col py-44'>
      <h1>Search Results for: {params.query ? params.query : 'No query provided'}</h1>
      
      {loading ? (
        <div className="grid grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {data.map((product, key) => (
            <ProductCard product={product} key={key} />
          ))}
        </div>
      ) : (
        <h2>No results found.</h2>
      )}
    </div>
  );
}
