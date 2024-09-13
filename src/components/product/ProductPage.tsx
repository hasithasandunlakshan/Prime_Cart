"use client"

import { CartContext } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
interface Product {
    id: number; // Unique identifier for the product
    name: string; // Product name
    description: string; // Product description
    price: number; // Price of the product
    category: string; // Main category of the product
    subcategory: string; // Subcategory of the product
    image: string; // URL of the product image
    rating: number; // Product rating (out of 5)
    comments: string[]; // Array of user comments or reviews
  }
 const ProductPage:React.FC<{product:Product}>=({product})=>{
const[quantity,setquantity]=useState(1);
const [color,setcolor]=useState();
const [isInCart, setIsInCart] = useState(true);
const router=useRouter();
const handleIncrement=()=>{
  

setquantity(quantity+1);
}
const handleDecrement=()=>{
    if(quantity==1){
        setquantity(1);
    }
    else{

        setquantity(quantity-1);
    }
    }
    const cartContext = useContext(CartContext);
    const { addProduct } = cartContext;
    const handleAddToCart = () => {
        const newProduct = { id: '123', name: 'Product', price: 100 }; // Example product
        addProduct(newProduct);
        console.log('Product added:', cartContext?.products);
        setIsInCart(false);
      };
    return (

<div className="py-8 bg-gray-100 dark:bg-gray-800">
    <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col -mx-4 md:flex-row">
            <div className="px-4 md:flex-1">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="object-cover w-full h-full" src={product.image} alt="Product Image" />
                </div>
                <div className="flex mb-4 -mx-2">
                    {isInCart?
                       <div className="w-full px-2">
                       <button onClick={handleAddToCart} className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                   </div>: 
                   
                   
                   <div className="w-full px-2">
                       <button onClick={()=>router.push("/cart")} className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700">View Cart</button>
                   </div>}
                 
            
                   
                </div>
            </div>
            <div className="px-4 md:flex-1">
                <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">{product.name}</h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">${product.price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                    <div className="flex items-center mt-2">
                        <button className="w-6 h-6 mr-2 bg-gray-800 rounded-full dark:bg-gray-200"></button>
                        <button className="w-6 h-6 mr-2 bg-red-500 rounded-full dark:bg-red-700"></button>
                        <button className="w-6 h-6 mr-2 bg-blue-500 rounded-full dark:bg-blue-700"></button>
                        <button className="w-6 h-6 mr-2 bg-yellow-500 rounded-full dark:bg-yellow-700"></button>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div className="flex items-center mt-2">
                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                    </div>
                </div>


                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
                    <div className="flex items-center mt-2">
                        <button onClick={()=>handleDecrement()} className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">-</button>

                        <button className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600">{quantity}</button>
                       
                        <button onClick={()=>handleIncrement()} className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">+</button>
                       
                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                     {product.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>


    );
}
export default ProductPage;