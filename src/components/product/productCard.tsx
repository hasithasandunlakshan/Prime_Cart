"use client"
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Product {
  productId: number; // Unique  identifier for the product
  categoryid: number;
  title: string; // Product name
  description: string; // Product description
  price: number; // Price of the product
  category: string; // Main category of the product
  subcategory: string; // Subcategory of the product
  imageUrl: string; // URL of the product image
  rating: number; // Product rating (out of 5)
}

const incrementProductView = async (productId: number) => {
  try {
    const response = await fetch('/api/productView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();
    console.log('Product view incremented:', data);
  } catch (error) {
    console.error('Error incrementing product view:', error);
  }
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleProductClick = () => {
    incrementProductView(product.productId); // Increment product view
    router.push(`/products/${product.productId}`); // Navigate to product page
  };

  return (
    <div
      onClick={handleProductClick}
      className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md cursor-pointer"
    >
      <div className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl">
        <img className="object-cover" src={product.imageUrl} alt={product.title} />
      </div>
      <div className="px-5 pb-5 mt-4">
        <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
        <div className="flex items-center justify-between mt-2 mb-5">
          <p>
            <span className="text-3xl font-bold text-slate-900">Rs:{product.price}</span>
          </p>
        </div>
        <div className="flex items-center">
          <Rating value={product.rating} readOnly name="half-rating-read" precision={0.5} />
          <span className="ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
