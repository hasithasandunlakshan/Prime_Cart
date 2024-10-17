"use client";
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

interface Sku {
  sku: string,
      productId: number,
      price: number,
      availableStock: number
}

interface ProductData {
  result: Product[];
  images: ImagesDetails[];
  sku: Sku[]; // Add Sku data interface
}

const Product = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<Product[]>([]);
  const [images, setImages] = useState<ImagesDetails[]>([]);
  const [skuData, setSkuData] = useState<Sku[]>([]);
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
      console.log("ggggggggggggggggggggggggggggggggggg",skuData);// Store skuData
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data.length || !images.length) {
    return <p>No products found.</p>;
  }

  return (
    <>
      {data.map((product) => (
        <ProductPage
          key={product.productId}
          product={product}
          images={images}
         skuData={skuData}  // Pass skuData to ProductPage
        />
      ))}
    </>
  );
};

export default Product;
