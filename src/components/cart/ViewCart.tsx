
import { CartContext } from '@/hooks/useCart'
import { useContext } from 'react'
import * as React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  productName: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
  sku:string;
}

interface ViewCartProps {
  product: Product;
}

export default function ViewCart({ product }: ViewCartProps) {
  const cartcontext = useContext(CartContext);
  const router=useRouter();

const{data:session}=useSession();
  const handleRemoveCart = async () => {
   
   
    try {
      const response = await fetch(`/api/cart/${session?.user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productSKU: product.sku }),
        
      });
  cartcontext?.removeProduct(product.sku);
      const data = await response.json();
      console.log("Product removed from DB:", data);
      router.refresh();
      
  
      if (!response.ok) {
        console.error("Error removing product from the cart in DB:", data.message);
      }
    } catch (error) {
      console.error("Error removing product from DB:", error);
    }
  };

  
  return (
    <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
      <div className="flex items-center gap-4 justify-normal">
        <div className="w-20 h-20 max-sm:w-24 max-sm:h-12 shrink-0">
          <img src={product.imageUrl} className="object-contain w-full h-full" alt={product.productName} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
          <h3 className="text-base font-bold text-gray-800">{product.productName}</h3>
            <h3 className="text-base font-bold text-gray-800">{product.sku}</h3>
            <p className="flex items-center gap-2 mt-2 text-sm font-semibold text-gray-500">
              Quantity <span className="inline-block w-5 h-5 rounded-md" style={{ backgroundColor: product.color }}> {product.quantity}</span>
            </p>
            <h3 className="mt-auto text-base text-gray-800"><span className='text-sm font-semibold text-gray-500'>Unit price :</span>Rs {product.price}</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-auto">
        <div className="flex items-start justify-end gap-4">
          <button onClick={handleRemoveCart}>
            <DeleteOutlinedIcon className="text-red-400" />
          </button>
        </div>
        <h3 className="mt-auto text-base font-bold text-gray-800"> Total   Rs {(product.price * product.quantity).toFixed(2)}</h3>
      </div>
    </div>
  );
}