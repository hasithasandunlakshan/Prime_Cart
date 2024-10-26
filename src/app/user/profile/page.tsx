
import React, { useEffect, useState } from 'react'
import Profile from '@/components/profile/Profile'
import Payment from '@/components/Payment/payment'
import UpdateProfile from '@/components/profile/updateProfile/updateProfile'
const page = () =>{


  return (
    
      <div>
        <div>
        <Profile/> 
        </div>
        
        <div>
        <UpdateProfile/>
        </div>
      </div>  
   
  )
      

      
}
export default page;