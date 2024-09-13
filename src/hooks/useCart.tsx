"use client";
import { createContext, useState, ReactNode } from "react";

export const CartContext = createContext<{
  products: any[];
  addProduct: (product: any) => void;
  removeProduct: (productId: string) => void;
  
} | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<any[]>([]);

  const addProduct = (product: any) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};
