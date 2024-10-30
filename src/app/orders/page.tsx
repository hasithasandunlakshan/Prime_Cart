"use client"
import React from "react";
import OrderItemCard from "./components/orderitemcard";
import { useSession } from "next-auth/react";

export default async function MyOrders() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Please sign in to view your orders</div>;
  }
  const response = await fetch(
    `http://localhost:3001/api/myorders?userId=${userId}&status=${"all"}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (response.status !== 200) {
    return <div>Error loading orders</div>;
  }
  const body = await response.json();
  console.log(body);

  const orders = body.orders;

  return (
    <div className="">
      <h1 className="mb-5 text-2xl font-bold">All Orders</h1>
      <ul>
        {orders.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </ul>
    </div>
  );
}
