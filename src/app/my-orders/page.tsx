"use client";
import React from 'react';
import OrderList from '../../components/orders/page';

const MyOrdersPage = () => {
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <OrderList />
    </div>
  );
};

export default MyOrdersPage;
