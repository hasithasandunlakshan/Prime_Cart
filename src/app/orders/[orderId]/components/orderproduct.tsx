/* eslint-disable @next/next/no-img-element */
import React from "react";

interface Variant {
  variantId: number;
  title: string;
  textValue: string;
}

interface Product {
  productId: number;
  title: string;
  sku: string;
  imageUrl: string;
  price: number;
  quantity: number;
  variants: Variant[];
}

interface Props {
  product: Product;
}

const OrderProductCard = ({ product }: Props) => {
  return (
    <li className="card p-5 w-full rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="w-full">
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-gray-400">SKU: {product.sku}</p>
            <div className="grid grid-cols-4 w-full gap-5 mt-3">
              {product.variants.map((variant) => (
                <div key={variant.variantId}>
                  <p>{variant.title}</p>
                  <p className="font-bold">{variant.textValue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold">Rs. {product.price.toFixed(2)}</p>
          <p className="font-bold text-2xl">x {product.quantity}</p>
        </div>
      </div>
    </li>
  );
};

export default OrderProductCard;
