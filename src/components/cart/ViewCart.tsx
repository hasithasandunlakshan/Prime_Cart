
import { CartContext } from '@/hooks/useCart'
import { useContext } from 'react'
import * as React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';

interface Product {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
}

interface ViewCartProps {
  product: Product;
}

export default function ViewCart({ product }: ViewCartProps) {
  const cartcontext = useContext(CartContext);


  const handleRemoveCart = () => {
    cartcontext?.removeProduct(product.id);



  };

  return (
    <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
      <div className="flex gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
          <img src={product.image||"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"} className="object-contain w-full h-full" alt={product.name} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
            <p className="flex items-center gap-2 mt-2 text-sm font-semibold text-gray-500">
              Color: <span className="inline-block w-5 h-5 rounded-md" style={{ backgroundColor: product.color }}></span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-auto">
        <div className="flex items-start justify-end gap-4">
          <button onClick={handleRemoveCart}>
            <DeleteOutlinedIcon className="text-red-700" />
          </button>
        </div>
        <h3 className="mt-auto text-base font-bold text-gray-800">${product.price.toFixed(2)}</h3>
      </div>
    </div>
  );
}
