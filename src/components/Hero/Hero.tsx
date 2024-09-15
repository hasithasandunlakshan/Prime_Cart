'use client'
import React from 'react'
import Login from '../user/Login'
import { products } from '@/sample/Products'
import { Registation } from '../user/Registation'
import ProductCard from '../product/productCard'
import { useSession } from 'next-auth/react'
import ProductPage from '../product/ProductPage'

export default function  Hero() {
  const{data:session}=useSession();

  return (
<div className='z-0 min-h-screen ' >



<div className="grid grid-cols-4 gap-5" >


  {products.map((product,key)=>(
  <ProductCard product={product}/>
))
}
{/* <h1  >{session?.user?.name?.charAt(0)} </h1> */}

  </div> 

  

  </div>
  )
}
