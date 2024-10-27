"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Order {
    orderId: string;
    deliveryMethod: string;
    totalAmount: number;
    paymentMethod: string;
    estimatedDeliveryDate: string;
    deliveryFee: number;
}

const OrderHistory: React.FC = () => {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session?.user?.id) return;
            const response = await fetch(`/api/my-orders?userId=${session.user.id}`);
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, [session]);

    return (
        <div className="max-w-4xl p-4 mx-auto font-sans">
            <h1 className="text-2xl font-extrabold text-gray-800">My Orders</h1>
            <div className="mt-8">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.orderId} className="border-b py-4">
                            <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
                            <p>Delivery Method: {order.deliveryMethod}</p>
                            <p>Total Amount: ${order.totalAmount}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Estimated Delivery Date: {order.estimatedDeliveryDate}</p>
                            <p>Delivery Fee: ${order.deliveryFee}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
