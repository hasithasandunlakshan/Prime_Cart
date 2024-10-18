"use client"
import React, { useEffect, useState } from 'react'
import Profile from '@/components/profile/profile'
import Payment from '@/components/Payment/payment'
const page = () =>{
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);


  return (
    <div>
      <div>
        <Profile/>
      </div>
      <div>
        <Payment/>
      </div>
    </div>
   
  )
}
export default page;