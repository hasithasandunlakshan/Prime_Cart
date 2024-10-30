import BannerCarousel from '@/components/Hero/BannerCarousel';
import Hero from '@/components/Hero/Hero';
import ALLPRODUCTS from '@/components/allproducts/allproducts';

import React from 'react';
export default function Home() {
  return (
   <div className="h-full min-h-screen bg-white ">
   <BannerCarousel/>
   {/* <UserDetails/> */}
   <Hero/>
   
<ALLPRODUCTS/>
   </div>
  );
}