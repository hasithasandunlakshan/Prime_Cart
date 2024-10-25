"use client";

import { toast } from '@/hooks/use-toast';
import { CartContext } from '@/hooks/useCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { ToastAction } from '../ui/toast';

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
}

interface Sku {
  sku: string;
  productId: number;
  price: number;
  availableStock: number;
  variants: Variant[];
}

interface CartProduct {
  userId: number;
  sku: string;
  quantity: number;
}

interface Attribute {
  ProductId: number;
  attribute: string;
  value: string;
}

const ProductPage: React.FC<{ product: Product; images: ImagesDetails[]; skuData: Sku[]; attribute: Attribute[] }> = ({
  product,
  images,
  skuData,
  attribute,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(`${product.imageUrl}`);
  const [selectedSku, setSelectedSku] = useState<Sku | null>(skuData[0]);
  const { data: session } = useSession();
  const [isInCart, setIsInCart] = useState(true);
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);
  const handleAddToCart = async () => {
    setIsLoadingCart(true); // Start loading
    const newProduct = {
      userId: Number(session?.user?.id) || 0,
      sku: selectedSku?.sku || product?.sku,
      quantity: quantity,
    };
  
    try {
      await onSubmit(newProduct); // Await onSubmit
      setIsInCart(false); // Update the inCart state here if successful
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to Add to Cart",
        description: "There was an issue adding the product to your cart.",
      });
    } finally {
      setIsLoadingCart(false); // End loading
    }
  };
  

  const handleSkuSelect = (sku: string) => {
    const selected = skuData.find((s) => s.sku === sku);
    if (selected) {
      setSelectedSku(selected);
      setImage(images[0]?.imageUrl);
    }
  };

  const onSubmit = async (product: CartProduct) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const responseBody = await response.json();
      if (!response.ok) throw new Error(`Error ${response.status}: ${responseBody.error || 'Something went wrong'}`);
      setIsInCart(false);
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast({
        variant: "destructive",
        title: "Please SignIn",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center py-8 bg-gray-100">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col -mx-4 md:flex-row">
          <div className="px-4 md:flex-1">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img className="object-cover w-full h-full rounded-2xl" src={`/${image}`} alt="Product Image" />
            </div>

            <div className="flex justify-center h-20 gap-4 ">
              {images.map((image, key) => (
                <img
                  key={key}
                  src={`/${image.imageUrl}`}
                  alt={`Thumbnail ${key + 1}`}
                  onClick={() => setImage(image.imageUrl)}
                  className="object-cover transition duration-300 rounded-md cursor-pointer opacity-60 hover:opacity-100"
                />
              ))}
            </div>
          </div>

          <div className="px-4 md:flex-1">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">{product.title}</h2>
            <div className='my-5'>
      
              <p className="mt-2 text-sm">{product.description}</p>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600">Rs: {selectedSku?.price || product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="text-gray-600">{selectedSku?.availableStock || product.AvailableStock}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {skuData.map((sku) => (
                <div
                  key={sku.sku}
                  onClick={() => handleSkuSelect(sku.sku)}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedSku === sku ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="mb-2 text-lg font-bold">{sku.sku}</h3>
                  <div className="flex flex-wrap gap-2">
                    {sku.variants.map((variant) => (
                      <div
                        key={variant.variantId}
                        className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full"
                      >
                        <span className="font-semibold">{variant.title}:</span>
                        {variant.variantId === 1 ? (
                    <span
                      className="inline-block w-4 h-4 border border-gray-300 rounded-full"
                      style={{ backgroundColor: variant.value }}
                    />
                  ) : (
                    <span>{variant.value}</span>
                  )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-start gap-4 mt-5 mb-5 align-middle">
              <span className="font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center text-white">
                <button onClick={handleDecrement} className="px-4 py-2 mr-2 font-bold bg-black rounded-full">
                  -
                </button>
                <span className="px-4 py-2 mr-2 font-bold bg-black rounded-xl">{quantity}</span>
                <button onClick={handleIncrement} className="px-4 py-2 font-bold text-white bg-black rounded-full">
                  +
                </button>
              </div>
            </div>

           

            <div className="flex mt-10 mb-4 w-[80%]" >
              {isInCart ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isLoadingCart}
                  className={`w-[100%] px-4 py-2 font-bold text-white rounded-md  ${
                    isLoadingCart ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  {isLoadingCart ? 'Adding...' : 'Add to Cat'}
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

        <div className="border-b border-gray-300">
          <nav className="flex gap-4">
            <a href="#" title="" className="py-4 text-sm font-medium text-gray-900 border-b-2 border-gray-900 hover:border-gray-400 hover:text-gray-800">
              Description
            </a>
          </nav>
        </div>

        <div className="grid items-start justify-start mt-8 grid-col-2 sm:mt-12">
          {attribute.map((attr, key) => (
            <div key={key}>
              <h1 className="text-3xl font-bold"> ♦ {attr.attribute}</h1>
              <p className="mb-4">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
