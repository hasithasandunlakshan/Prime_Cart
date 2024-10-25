"use client"
import ViewCart from '@/components/cart/ViewCart'
import { CartContext } from '@/hooks/useCart'
import { Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function page() {


    const cartContext = useContext(CartContext);
const router=useRouter();
 

  return (
    <div className="max-w-4xl p-4 mx-auto font-sans max-md:max-w-xl">
    <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
    <div className="grid gap-4 mt-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
            {cartContext?.products?.map((product,Key)=>(
   <ViewCart product={product}/>

            ))}

           
           {/* <ViewCart/>
        
           <ViewCart/>
           <ViewCart/> <ViewCart/> <ViewCart/> <ViewCart/> */}

        </div>

        <div className="bg-white px-6 py-8 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)] flex flex-col gap-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">Subtotal:</span>
                    <span className="font-bold text-gray-800">$ {cartContext?.price}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">Shipping:</span>
                    <span className="font-bold text-gray-800">$10.00</span>
                </div> */}
            </div>
            <div className="flex items-center justify-between pt-4 font-bold text-gray-800 border-t border-gray-300">
                <span>Total:</span>
                <span>$ {cartContext?.price}</span>
            </div>

            <button onClick={()=>router.push("/cart/checkout")} type="button" className="w-full py-3 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">Proceed to Checkout</button>
        </div>
    </div>
</div>

  )
}
