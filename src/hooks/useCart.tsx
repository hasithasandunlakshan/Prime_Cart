"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define CartContext type
export const CartContext = createContext<{
  products: any[];
  price: number;
  addProduct: (product: any) => void;
  removeProduct: (productSKU: string) => void;
} | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [price, setPrice] = useState(0);
  const { data: session } = useSession();
  const router =useRouter();

  // Fetch cart items from the database
  useEffect(() => {
    const fetchCartItems = async () => {
      if (session?.user?.id) {
        try {
          console.log(session?.user?.email);
          const response = await fetch(`/api/cart/${session?.user?.id}`);

          if (!response.ok) {
            throw new Error("Failed to fetch cart items");
          }

          const data = await response.json();
          setProducts(data.result);
          setPrice(data.price[0]['sum(price*quantity)']);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
      else{
        const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setPrice(total);
      }
    };

    fetchCartItems();
  }, [products]); // Only re-run when session user ID changes

  // Function to add product to cart
  const addProduct = (product: any) => {
    setProducts((prevProducts) => [...prevProducts, product]);
   

    // Optionally, you can call an API to add this product to the cart in the database
  };

  // Function to remove product from cart
  const removeProduct = (productSKU: string) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.sku !== productSKU));
    
    // Optionally, you can call an API to remove this product from the cart in the database
  };

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct, price }}>
      {children}
    </CartContext.Provider>
  );
};
