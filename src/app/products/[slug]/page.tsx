"use client";
import Loading from '@/components/Loading/loading';
import ProductPage from '@/components/product/ProductPage';
import React, { useEffect, useState } from 'react';

interface Product {

  productId: number;
  categoryid: number;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  rating: number;
  AvailableStock: number;
  productImage: string;
  imageUrl: string;
  sku:string;
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
  variants: Variant[];
  imageUrl:string;  // Array of `Variant` objects
}
interface attribute {
  ProductId: number;
  attribute: string;
  value: string;
  // Optional field, if some variants don't have a textValue
}

interface ProductData {
  result: Product[];
  images: ImagesDetails[];
  sku: Sku[];
  attributes:attribute[] // Add Sku data interface
}

const Product = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<Product[]>([]);
  const [images, setImages] = useState<ImagesDetails[]>([]);
  const [skuData, setSkuData] = useState<Sku[]>([]);
  const [attributes, setAttribute] = useState<attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      const response = await fetch(`/api/products/${params.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("API request failed.");
      }

      const datasample: ProductData = await response.json();
      setData(datasample.result);
      setImages(datasample.images);
      setSkuData(datasample?.sku); 
      setAttribute(datasample.attributes)
      console.log("",skuData);// Store skuData
      setLoading(false);
      
    } catch (error) {
      setError("Error fetching data.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data.length || !images.length) {
    return <p>No products found.</p>;
  }

  return (
    <main className='py-36'>
      {data.map((product) => (
        <ProductPage
          key={product.productId}
          product={product}
          images={images}
         skuData={skuData} 
         attribute={attributes} // Pass skuData to ProductPage
        />
      ))}
    </main>
  );
};

export default Product;
