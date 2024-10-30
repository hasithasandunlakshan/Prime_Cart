import BannerCarousel from '@/components/Hero/BannerCarousel';
import Hero from '@/components/Hero/Hero';
import Categories from '@/components/Hero/categories';
import ALLPRODUCTS from '@/components/allproducts/allproducts';
import DailyOffer from '@/components/daily_offer/page';

import React from 'react';
export default function Home() {
  return (
   <div className="h-full min-h-screen bg-white ">
   <BannerCarousel/>
   {/* <UserDetails/> */}
   <Categories/>
   <Hero/>
   
   <DailyOffer/>
<ALLPRODUCTS/>
   </div>
  );
}