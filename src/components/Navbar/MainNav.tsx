"use client"
import React, { useEffect, useState } from 'react'
import Cart from '../cart/Cart'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
export default function MainNav() {
  const [searchText, setSearchText] = useState('');
  

  // Handler function for text field changes
  const handleChange = (event:any) => {
    setSearchText(event.target.value);
    
  };

  // Handler function for button click
  const handleSearch = () => {
    console.log('Search value:', searchText);
    
    fetchData();
  
    // Add your search logic here
  };
  async function fetchData() {
    try{
      const response =await fetch(`/api/search/${searchText}`,
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
      console.log('API response:', data);
      // Process the response data as needed
      
    }
    
    catch(error){
      
    }
    
    
  }
  return (
    <div className='z-50 flex flex-row items-center justify-around w-full h-auto mb-2 bg-gray-50 max-h-20'>
      <Link href={"/"}>
<Image src={"/images/logo.png"} alt='logo' width={150} height={50} className=''></Image>
      </Link>
<div className='flex w-1/2 gap-5'>
<TextField id="outlined-basic" label="Explore" variant="outlined" size='small' fullWidth onChange={handleChange}   />
<Button className='text-white bg-black'  onClick={handleSearch}>Search</Button>
</div>

        <Cart/>
    </div>
  )
}