"use client"
import { Button } from '@mui/material';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React, { useEffect, useState } from 'react';

function Page({ params }: { params: { category: string } }) {
    console.log("huuuuuuuuuuu", params.category);
  
    // Correct use of decodeURIComponent


    const [data, setData] = useState([]);

 
    async function fetchData() {
        try{
          const response =await fetch(`/api/category/${decodeURIComponent(params.category)}`,
           { method:'GET',
            headers: {
              'Content-Type': 'application/json',
          },
        
        }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const fetcheddata = await response.json();
          setData(fetcheddata);
          console.log('API response:', fetcheddata);
          // Process the response data as needed
          
        }
        
        catch(error){
          
        }
        
        
      }

      useEffect(()=>{

        fetchData();
      },[])
    return (
        <div>


        <h1>{decodeURIComponent(params.category)}</h1>
        
        
{data.map((product,key)=>(
    <div className="flex">
        
        {/* {product?.id}
        <div className="flex">{product?.name}</div> */}
        </div>
    
))}
        </div>
    );
}

export default Page;
