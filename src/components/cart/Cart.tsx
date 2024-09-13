"use client"
import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { CartContext } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const productCount = cartContext?.products.length || 0;
const router =useRouter();
  const handleClick = () => {
    // Add logic to handle click event, e.g., open cart modal
   router.push("/cart")
  };

  return (
    <Badge badgeContent={productCount}  showZero color="primary" className='cursor-pointer' onClick={handleClick}>
      <ShoppingCartIcon color="action" fontSize="large" />
    </Badge>
  );
}
