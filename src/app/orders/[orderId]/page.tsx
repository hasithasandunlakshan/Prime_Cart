"use client"
import React, { useState, useEffect } from "react";
import OrderProductCard from "./components/orderproduct";

interface Props {
  params: { orderId: string };
}

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

interface Order {
  orderId: number;
  date: string;
  time: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  deliveryFee: number;
  deliveryMethod: string;
  estimatedDeliveryDate: string;
  name: string;
  address: string;
  products: Product[];
}

const OrderDetails = ({ params: { orderId } }: Props) => {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderIdInt = Number(orderId);
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3000/api/orderdetails?orderId=${orderIdInt}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        const body = await response.json();
        setOrder(body.orderDetails);
      } catch (err) {
        setError("Error: Order details not found");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Use optional chaining and default values to prevent TypeScript errors
  const orderProducts = order?.products ?? []; // Default to an empty array if undefined
  const orderStatus = order?.status ?? "Unknown"; // Default to 'Unknown' if undefined
  const totalAmount = order?.totalAmount ?? 0; // Default to 0 if undefined
  const deliveryFee = order?.deliveryFee ?? 0; // Default to 0 if undefined

  let spanClassName: string;

  switch (orderStatus) {
    case "Pending":
      spanClassName = `h-min bg-blue-500 px-3 rounded-md text-blue-700`;
      break;
    case "Processing":
      spanClassName = `h-min bg-amber-500 px-3 rounded-md text-amber-700`;
      break;
    case "Shipped":
      spanClassName = `h-min bg-sky-500 px-3 rounded-md text-sky-700`;
      break;
    case "Delivered":
      spanClassName = `h-min bg-green-500 px-3 rounded-md text-green-700`;
      break;
    case "Cancelled":
      spanClassName = `h-min bg-red-500 px-3 rounded-md text-red-700`;
      break;
    default:
      spanClassName = `h-min bg-gray-500 px-3 rounded-md text-gray-700`;
      break;
  }

  return (
    <>
      <div className="flex flex-row space-x-4">
        <h1 className="mb-5 text-2xl font-bold me-10">
          Order Details - Order Id #{orderId}{" "}
        </h1>
        <span className={spanClassName}>{orderStatus}</span>
      </div>

      <div className="grid w-full grid-cols-3 space-x-5">
        <div className="col-span-2 p-5 rounded-lg card h-min bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-7">Products</h2>
          <ul className="space-y-3">
            {orderProducts.length > 0 ? (
              orderProducts.map((productVal) => (
                <OrderProductCard
                  key={productVal.productId}
                  product={productVal}
                />
              ))
            ) : (
              <li>No products found.</li>
            )}
          </ul>
        </div>
        <div className="p-5 rounded-lg card h-min bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-7">Order Summary</h2>
          <h1 className="text-2xl font-bold">{order?.name}</h1>
          <p className="text-gray-400">{order?.address}</p>
          <div className="mt-5">
            <h3 className="text-gray-400">Date Time</h3>
            <p className="font-bold">
              {order?.date} {order?.time.split(".")[0]}
            </p>
          </div>
          <h2 className="mt-10 text-xl font-bold">Payment Details</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <h3 className="text-gray-400">Sub total</h3>
            <p className="font-bold">Rs. {totalAmount.toFixed(2)}</p>
            <h3 className="text-gray-400">Delivery Charges</h3>
            <p className="font-bold">Rs. {deliveryFee.toFixed(2)}</p>
            <h3 className="text-gray-400">Total Amount</h3>
            <p className="text-lg font-bold">
              Rs. {(totalAmount + deliveryFee).toFixed(2)}
            </p>
            <h3 className="text-gray-400">Payment Method</h3>
            <p className="font-bold">{order?.paymentMethod}</p>
          </div>
          <h2 className="mt-10 text-xl font-bold">Delivery Details</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <h3 className="text-gray-400">Delivery Method</h3>
              <p className="font-bold">{order?.deliveryMethod}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Estd. Delivery Date</h3>
              <p className="font-bold">{order?.estimatedDeliveryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
