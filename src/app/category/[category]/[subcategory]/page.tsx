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
        <div className='relative flex flex-col items-center justify-center min-h-screen align-middle py-44 max-w-screen'>
         

            {loading ? (
                <span className="loading loading-dots loading-lg"></span>  // Show loading state
            ) : (
                data.length >0 ?

                <>
                   <h1 className=' text-slate-800 items-start justify-start w-[95%] text-6xl font-bold'>{decodeURIComponent(params.subcategory)}</h1>
                <div className="grid h-full grid-cols-4 ">
                  {data.map((product,key)=>(
                    <ProductCard product={product}/>
                  ))}
                </div>
                </>
                
                  
                 
              : (
                    <h1>: No products</h1>
                ) 
            )}
        </div>
    );
}

export default Page;
