import React from "react";
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

const OrderDetails = async ({ params: { orderId } }: Props) => {
  const orderIdInt = Number(orderId);

  const response = await fetch(
    `http://localhost:3001/api/orderdetails?orderId=${orderIdInt}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (response.status !== 200) {
    return <div>Error: {response.statusText}</div>;
  }
  const body = await response.json();
  console.log(body);

  const order: Order | undefined = body.orderDetails;

  if (!order) {
    return <div>Error: Order details not found</div>;
  }

  let spanClassName: string;

  switch (order.status) {
    case "Pending":
      spanClassName = `h-min bg-blue-500 px-3 rounded-md text-blue-700`;
      break;
    case "Processing":
      spanClassName = `h-min bg-amber-500 px-3  rounded-md text-amber-700`;
      break;
    case "Shipped":
      spanClassName = `h-min bg-sky-500 px-3  rounded-md text-sky-700`;
      break;
    case "Delivered":
      spanClassName = `h-min bg-green-500 px-3 rounded-md text-green-700`;
      break;
    case "Cancelled":
      spanClassName = `h-min bg-red-500 px-3  rounded-md text-red-700`;
      break;
    default:
      spanClassName = `h-min bg-gray-500 px-3  rounded-md text-gray-700`;
      break;
  }

  return (
    <>
      <div className="z-50 flex flex-row space-x-4">
        <h1 className="mb-5 text-2xl font-bold me-10">
          Order Details - Order Id #{orderId}{" "}
        </h1>
        <span className={spanClassName}>{order.status}</span>
      </div>

      <div className="grid w-full grid-cols-3 space-x-5">
        <div className="col-span-2 p-5 rounded-lg card h-min bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-7">Products</h2>
          <ul className="space-y-3">
            {order.products.map((productVal) => (
              <OrderProductCard
                key={productVal.productId}
                product={productVal}
              />
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-lg card h-min bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-7">Order Summary</h2>
          <h1 className="text-2xl font-bold">{order.name}</h1>
          <p className="text-gray-400">{order.address}</p>
          <div className="mt-5">
            <h3 className="text-gray-400">Date Time</h3>
            <p className="font-bold">
              {order.date} {order.time.split(".")[0]}
            </p>
          </div>
          <h2 className="mt-10 text-xl font-bold">Payment Details</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <h3 className="text-gray-400">Sub total</h3>
            <p className="font-bold">Rs. {order.totalAmount.toFixed(2)}</p>
            <h3 className="text-gray-400">Delivery Charges</h3>
            <p className="font-bold">Rs. {order.deliveryFee.toFixed(2)}</p>
            <h3 className="text-gray-400">Total Amount</h3>
            <p className="text-lg font-bold">
              Rs. {(order.totalAmount + order.deliveryFee).toFixed(2)}
            </p>
            <h3 className="text-gray-400">Payment Method</h3>
            <p className="font-bold">{order.paymentMethod}</p>
          </div>
          <h2 className="mt-10 text-xl font-bold">Delivery Details</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <h3 className="text-gray-400">Delivery Method</h3>
              <p className="font-bold">{order.deliveryMethod}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Estd. Delivery Date</h3>
              <p className="font-bold">{order.estimatedDeliveryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
