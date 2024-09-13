import { CartContext } from '@/hooks/useCart'

import {useContext} from 'react'
import * as React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';
export default function ViewCart({product}) {
    const cartcontext=useContext(CartContext);
    const {removeProduct}=cartcontext;
    const handleRemoveCart=()=>{
        removeProduct("123");
    }
  return (
    <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                <div className="flex gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img src='https://readymadeui.com/images/watch1.webp' className="w-full h-full object-contain" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-800">{product?.name}</h3>
                            <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">Color: <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span></p>
                        </div>

                        {/* <div className="mt-auto flex items-center gap-3">
                            <button type="button" className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                </svg>
                            </button>
                            <span className="font-bold text-sm leading-[18px]">2</span>
                            <button type="button" onClick={removecart("123")} className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>

                <div className="ml-auto flex flex-col">
                    <div className="flex items-start gap-4 justify-end">
                        <button>
                        
                        </button>
                        <button onClick={handleRemoveCart}>
                            <DeleteOutlinedIcon className='text-red-700'/>
                        
                        
                        </button>
                    

                     
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mt-auto">$120.00</h3>
                </div>
            </div> 

  )
}
