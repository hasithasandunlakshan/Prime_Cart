"use client"
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'
interface Product {
    id: number; // Unique identifier for the product
    title: string; // Product name
    description: string; // Product description
    price: number; // Price of the product
    // category: string; // Main category of the product
    // subcategory: string; // Subcategory of the product
    image: string; // URL of the product image
    rating: number; // Product rating (out of 5)
    // comments: string[]; // Array of user comments or reviews
    
  }
  
  export default function ProductCard({ product }: { product: Product }) {
    const router=useRouter();
  return (
    <div onClick={()=>router.push(`/products/${product.id}`)} className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md cursor-pointer">
  <div className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" >
    <img className="object-cover" src={product.image} alt="product image" />
    <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-black rounded-full">39% OFF</span>
  </div>
  <div className="px-5 pb-5 mt-4">
    <div >
      <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
    </div>
    <div className="flex items-center justify-between mt-2 mb-5">
      <p>
        <span className="text-3xl font-bold text-slate-900">{product.price}</span>
        <span className="text-sm line-through text-slate-900">$699</span>
      </p>
      <div className="flex items-center">
        <Rating value={product.rating}  readOnly name="half-rating-read" precision={0.5}/>
       
        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
      </div>
    </div>
    {/* <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart
    </a> */}
  </div>
</div>

  )
}
