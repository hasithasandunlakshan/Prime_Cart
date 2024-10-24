"use client";

import { toast } from '@/hooks/use-toast';
import { CartContext } from '@/hooks/useCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { ToastAction } from '../ui/toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Product {
  productId: number; 
  title: string; 
  description: string; 
  price: number; 
  AvailableStock: number; 
  imageUrl: string;
  rating: number;
  sku: string;
}

interface ImagesDetails {
  productId: number;
  imageId: number;
  imageUrl: string;
}
interface Variant {
  variantId: number;
  title: string;
  value: string;
  textValue?: string; // Optional field, if some variants don't have a textValue
}
interface Sku {
  sku: string;
  productId: number;
  price: number;
  availableStock: number;
  variants: Variant[];  // Array of `Variant` objects
}
interface cartProduct{
      
      userId:number,  // Assuming you have access to the user's ID
      sku:string;
      quantity:number;
}

const ProductPage: React.FC<{ product: Product; images: ImagesDetails[]; skuData: Sku[] }> = ({
  product,
  images,
  skuData,
}) => 
    {
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(`${product.imageUrl}`);
  const [selectedSku, setSelectedSku] = useState<Sku | null>(
    skuData && skuData.length > 0 ? skuData[0] : null
  );
const {data:session}=useSession();
  const [isInCart, setIsInCart] = useState(true);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const newProduct = {
   
        userId : Number(session?.user?.id) || 0,
      sku: selectedSku?.sku || product?.sku,  // Use the selected SKU or the product SKU
      quantity: quantity  // Use the quantity value, not the setter function
    };
    
    cartContext?.addProduct(newProduct);
    onSubmit(newProduct);
  
   
  };
  const handleSkuChange = (sku1:String) => {
    const sku = sku1;
    const selected = skuData.find((s) => s.sku === sku);
    if (selected) {
      setSelectedSku(selected);
      setImage(images[0]?.imageUrl);  // Assuming all SKUs share the same images
    }
  };

  const onSubmit = async (product: cartProduct) => {
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        // Log the status and response body for debugging
        const responseBody = await response.json();
        console.log('Response:', responseBody);
        

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseBody.error || 'Something went wrong'}`);
        }

        console.log('Success:', responseBody);
        setIsInCart(false);
    } catch (error) {
        console.error('Error in onSubmit:', error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    }
};

  return (
    <div className="py-8 bg-gray-100 dark:bg-gray-100">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col -mx-4 md:flex-row">
          <div className="px-4 md:flex-1">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-300 mb-4">
              <img className="object-cover w-full h-full rounded-2xl" src={`/${image}`} alt="Product Image" />
            </div>

            <div className="flex justify-center gap-4 py-4 overflow-x-auto">
              {images.map((image, key) => (
                <img
                  key={key}
                  src={`/${image?.imageUrl}`}
                  alt={`Thumbnail ${key + 1}`}
                  onClick={() => setImage(image?.imageUrl)}
                  className="object-cover transition duration-300 rounded-md cursor-pointer size-16 sm:size-20 opacity-60 hover:opacity-100"
                />
              ))}
            </div>
          </div>

          <div className="px-4 md:flex-1">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 ">{product.title}</h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 ">Price:</span>
                <span className="text-gray-600 ">Rs: {selectedSku?.price || product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 ">Availability:</span>
                <span className="text-gray-600 ">{selectedSku?.availableStock || product.AvailableStock}</span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 align-middle">
          <Select   onValueChange={(value)=>handleSkuChange(value)}>

              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Product Variants" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Other Products</SelectLabel>
                  {skuData.map((sku) => (
  <SelectItem key={sku.sku} value={sku.sku} >

    
    {sku.sku}
    {sku.variants.map((variant) => (
      <p key={variant.variantId} className=''>
        {variant.title}: 
        {variant.variantId === 1 ? (
          <>
            {/* Render the color variant as a colored box */}
            <span 
              className="inline-block w-5 h-5 mt-2 border border-gray-300 rounded-full" 
              style={{ backgroundColor: variant.value }}
            ></span>
          </>
        ) : (
          <>
            {/* Render other variants normally */}
            {variant.value}
          </>
        )}
      </p>
    ))}
  </SelectItem>
))}


                </SelectGroup>
              </SelectContent>
            </Select>

           
          </div>

            {/* <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select SKU:</span>
              <select
                className="px-4 py-2 mt-2 text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                value={selectedSku?.sku}
                onChange={handleSkuChange}
              >
                {skuData.map((sku) => (
                  <option key={sku.sku} value={sku.sku}>
                    {sku.sku}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Quantity:</span>
              <div className="flex items-center mt-2">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  -
                </button>

                <span className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-900 ">Product Description:</span>
              <p className="mt-2 text-sm text-gray-900 ">{product.description}</p>
            </div>

            <div className="flex mt-10 mb-4">
              {isInCart ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-md max-w-60 hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={() => router.push('/cart')}
                  className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md max-w-60 hover:bg-gray-700"
                >
                  View Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
