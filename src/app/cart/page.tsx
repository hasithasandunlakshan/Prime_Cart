"use client"
import ViewCart from '@/components/cart/ViewCart'
import { CartContext } from '@/hooks/useCart'
import { Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function page() {


    const cartContext = useContext(CartContext);
const router=useRouter();
const cartcontext = useContext(CartContext);
if (cartContext?.products?.length === 0) {
    return (
      <div className="max-w-4xl min-h-screen p-4 mx-auto font-sans bg-white py-44 max-md:max-w-xl">
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-4 mx-auto font-sans py-44 max-md:max-w-xl">
    <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
    <div className="grid gap-4 mt-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
            {cartContext?.products?.map((product,Key)=>(
   <ViewCart key={Key} product={product}/>

            ))}

           
           {/* <ViewCart/>
        
           <ViewCart/>
           <ViewCart/> <ViewCart/> <ViewCart/> <ViewCart/> */}

        </div>


          
                {/* <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">Subtotal:</span>
                    <span className="font-bold text-gray-800">$ {cartContext?.price}</span>
                </div> */}
                {/* <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">Shipping:</span>
                    <span className="font-bold text-gray-800">$10.00</span>
                </div> */}
            
            <div className="bg-white rounded-md px-4 py-6  h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                    <ul className="space-y-4 text-gray-800">
                        <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">Rs {cartContext?.price}</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Shipping </li>
                        <span className="ml-auto text-red-500">shiping fees add when checkout</span>
                        <hr className="border-gray-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">$ {cartContext?.price}</span></li>
                    </ul>

                    <div className="mt-8 space-y-2">
                        <button onClick={()=>router.push("/cart/checkout")} type="submit" className="text-sm px-4 hover:scale-105 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">Place Order</button>
                        <button onClick={()=>router.push("/")} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
                    </div>
            {/* <p className="mt-4 text-lg font-bold">Total: ${total}</p>
            <button type="button" onClick={onSubmit} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Place Order
            </button> */}
            </div>
            {/* <div className="flex items-center justify-between pt-4 font-bold text-gray-800 border-t border-gray-300">
                <span>Total:</span>
                <span>Rs {cartContext?.price}</span>
            </div>

            <button onClick={()=>router.push("/cart/checkout")} type="button" className="w-full py-3 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">Proceed to Checkout</button> */}
        
    </div>
</div>

  )
}
