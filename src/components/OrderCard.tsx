import React from 'react';
import Link from 'next/link';

interface OrderCardProps {
  orderId: number;
  productName: string;
  imageUrl: string;
  quantity: number;
  totalPrice: number;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderId, productName, imageUrl, quantity, totalPrice }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer">
      <Link href={`/my-orders/${orderId}`}>
        <div>
          <img src={imageUrl} alt={productName} className="w-full h-48 object-cover rounded-md" />
          <div className="mt-2">
            <h2 className="text-lg font-semibold">{productName}</h2>
            <p className="text-gray-600">Quantity: {quantity}</p>
            <p className="text-gray-800 font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderCard;
