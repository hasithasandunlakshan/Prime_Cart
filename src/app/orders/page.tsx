"use client";
import React, { useEffect, useState } from "react";
import OrderItemCard from "./components/orderitemcard";
import { useSession } from "next-auth/react";

interface Order {
  id: string;
}

export default function MyOrders() {
  const { data: session } = useSession();
  const userId = Number(session?.user?.id);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        console.log("userid    ",userId)
        const response = await fetch(
          `http://localhost:3000/api/myorders?userId=${userId}&status=all`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (response.status === 200) {
          const body = await response.json();
          console.log("hhh",body)
          setOrders(body.orders);
        } else {
          console.error("Error loading orders");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [[]]);

  if (!userId) {
    return <div>Please sign in to view your orders</div>;
  }

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="">
      <h1 className="mb-5 text-2xl font-bold">All Orders</h1>
      <ul>
        {orders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}
