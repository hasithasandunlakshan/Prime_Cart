"use client";
import ProductCard from '@/components/product/productCard';
import React, { useEffect, useState } from 'react';

function Page({ params }: { params: { subcategory: string } }) {
    console.log("huuuuuuuuuuu", params.subcategory);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    async function fetchData() {
        try {
            setLoading(true); // Set loading to true before fetching
            const response = await fetch(`/api/subcategory/${decodeURIComponent(params.subcategory)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const fetcheddata = await response.json();
            setData(fetcheddata);
            console.log('API response:', fetcheddata);
        } catch (error) {
            console.error('Error fetching data:', error); // Log the error
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    useEffect(() => {
        fetchData();
    }, [params.subcategory]); // Add params.subcategory as a dependency

    return (
        <div className='flex justify-center w-[100%] min-h-screen align-middle'>
            <h1>{decodeURIComponent(params.subcategory)}</h1>

            {loading ? (
                <span className="loading loading-dots loading-lg"></span>  // Show loading state
            ) : (
                data.length >0 ?
                <div className="flex grid h-full grid-cols-3">
                  {data.map((product,key)=>(
                    <ProductCard product={product}/>
                  ))}
                </div>
                
                  
                 
              : (
                    <h1>: No result</h1>
                ) 
            )}
        </div>
    );
}

export default Page;
