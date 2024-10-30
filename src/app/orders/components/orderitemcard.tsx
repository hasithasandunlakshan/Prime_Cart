import Link from 'next/link';
import React from 'react'

interface Order {
  orderId: number;
  date: string;
  estimatedDeliveryDate: string;
  status: string;
  totalAmount: number;
  itemCount: number;
  productTitle: string;
  imageUrl: string;
}
interface Props{
    order: Order
}

const OrderItemCard = ({order} : Props) => {
    let spanClassName: string;

    switch (order.status) {
      case "Pending":
        spanClassName = `bg-blue-500 px-3  rounded-md text-blue-700`;
        break;
      case "Processing":
        spanClassName = `bg-amber-500 px-3  rounded-md text-amber-700`;
        break;
      case "Shipped":
        spanClassName = `bg-sky-500 px-3  rounded-md text-sky-700`;
        break;
      case "Delivered":
        spanClassName = `bg-green-500 px-3  rounded-md text-green-700`;
        break;
      case "Cancelled":
        spanClassName = `bg-red-500 px-3  rounded-md text-red-700`;
        break;
      default:
        spanClassName = `bg-gray-500 px-3  rounded-md text-gray-700`;
        break;
    }
  return (
    <li>
      <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-md mb-3">
        <div className="flex items-center">
          <img
            src={order.imageUrl}
            alt="Order Image"
            className="w-32 h-32 m-2 mr-4 rounded-md"
          />
          <div>
            <div className="flex flex-row items-center mb-3">
              <h2 className="text-lg font-semibold me-6">
                Order #{order.orderId}
              </h2>
              <span className={spanClassName}>{order.status}</span>
            </div>
            <h4 className="text-sm font-semibold">
              {order.productTitle}{" "}
              {order.itemCount>1 && `and ${order.itemCount - 1} more items`}
            </h4>
            <p className="text-sm text-gray-500 mb-1">
              Order Date: {order.date.split("T")[0]}
            </p>
            <p className="text-sm text-gray-500">
              Estimated Delivery Date: {order.estimatedDeliveryDate.split("T")[0]}
            </p>
          </div>
        </div>
        <div>
          <Link
            href={`orders/${order.orderId}`}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </li>
  );
}

export default OrderItemCard
