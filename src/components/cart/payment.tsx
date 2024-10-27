"use client"

import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CartContext } from '@/hooks/useCart';
import ViewCart from './ViewCart';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { useSession } from 'next-auth/react';
import UserDetails from '../profile/address';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
 
type Address = {
  addressId: string;
  firstName: string;
  lastName: string;
  addrNo: string;
  addrStreet: string;
  addrLine1: string;
  addrLine2: string;
  addrTown: string;
  addrDistrict: string;
  addrProvince: string;
  postalCode: string;
  contactNo: string;
};

type PaymentProps = {
  // Add any props if needed
};

const Payment: React.FC<PaymentProps> = () => {
  const [selectedShipping, setSelectedShipping] = useState<'fedex' | 'standard'>('fedex');
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'paypal'>('credit');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>(''); // Use string to match addressId type
  const cartContext = useContext(CartContext);
  const [deliveryFees, setDeliveryFees] = useState(0);
  const [address, setAddress] = useState(false);
  const totalPrice = Number(cartContext?.price) ?? 0;
  const [total, setTotal] = useState<number>(0);
  const session = useSession();
  const router = useRouter();
  const shippingPrices = {
    fedex: 10.00,
    standard: 5.00,
  };

  const calculateTotal = () => {
    const shippingTotal = shippingPrices[selectedShipping];
    setDeliveryFees(shippingTotal);
    setTotal(shippingTotal + totalPrice);
  };

  const openAddressForm = () => {
    setAddress(prev => !prev);  // Toggle the address form
  };
  
  const onSubmit = async () => {
    const userId = session.data?.user?.id;
    const deliveryFee = deliveryFees;

    const deliveryMethod = selectedShipping; 
    const totalAmount = total; 
    const paymentMethod = selectedPayment; 
    const estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Example: 7 days later

    if (!userId || !deliveryMethod || !totalAmount || !paymentMethod || !estimatedDeliveryDate || !deliveryAddress || !deliveryFee) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Missing required parameters.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const response = await fetch('/api/my-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          deliveryMethod, 
          totalAmount, 
          paymentMethod, 
          estimatedDeliveryDate, 
          addressId: deliveryAddress,
          deliveryFee,
          userId 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const responseBody = await response.json();
      console.log('Success:', responseBody);
      router.push("/order");

    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedShipping, totalPrice]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/checkout');
        if (!response.ok) throw new Error('Failed to fetch addresses');
        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddresses();
  }, [session.data?.user?.id]);

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items and select a suitable shipping method.</p>
          <div className="space-y-4">
            {cartContext?.products?.map((product, key) => (
              <ViewCart key={key} product={product} />
            ))}
          </div>
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="grid gap-6 mt-5">
            {Object.entries(shippingPrices).map(([method, price]) => (
              <div className="relative" key={method}>
                <input
                  className="hidden peer"
                  id={`radio_${method}`}
                  type="radio"
                  name="shipping"
                  value={method}
                  checked={selectedShipping === method}
                  onChange={() => setSelectedShipping(method as 'fedex' | 'standard')}
                />
                <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50" htmlFor={`radio_${method}`}>
                  <img className="object-contain w-14" src={"/images/credit.jpg"} alt={`${method.charAt(0).toUpperCase() + method.slice(1)} Delivery`} />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">{`${method.charAt(0).toUpperCase() + method.slice(1)} Delivery - $${price.toFixed(2)}`}</span>
                    <p className="text-sm leading-6 text-slate-500">Delivery: {method === 'fedex' ? '2-4 Days' : '5-7 Days'}</p>
                  </div>
                </label>
              </div>
            ))}
          </form>
        </div>

        <div className="px-4 pt-8">
          {address ? <UserDetails /> : 
          <div className="flex items-center justify-start gap-2 align-middle">
            <Select onValueChange={(value) => setDeliveryAddress(value)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Address" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Address</SelectLabel>
                  {addresses.map((address) => (
                    <SelectItem key={address.addressId} value={address.addressId}>
                      <p>{`${address.firstName} ${address.lastName}`}</p>
                      {address.addrNo}, {address.addrStreet}, {address.addrLine1}, {address.addrLine2}<br />
                      {address.addrTown}, {address.addrDistrict}, {address.addrProvince}, {address.postalCode}, {address.contactNo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <AlertDialog>

      <AlertDialogTrigger asChild className='' >
        <Button variant="outline">Add Address</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-full overflow-y-auto'>
        {/* <AlertDialogHeader >
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
        
          </AlertDialogDescription>
        </AlertDialogHeader> */}

        <UserDetails></UserDetails>
        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>router.refresh()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

          </div>}

          <p className="text-xl font-medium">Payment Methods</p>
          <form className="grid gap-6 mt-5">
            <div className="relative">
              <input className="hidden peer" id="credit" type="radio" name="payment" value="credit" checked={selectedPayment === 'credit'} onChange={() => setSelectedPayment('credit')} />
              <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
              <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50" htmlFor="credit">
                <img className="object-contain w-14" src={"/images/credit.jpg"} alt="Credit Card" />
                <span className="ml-5">Credit Card</span>
              </label>
            </div>

            <div className="relative">
              <input className="hidden peer" id="paypal" type="radio" name="payment" value="paypal" checked={selectedPayment === 'paypal'} onChange={() => setSelectedPayment('paypal')} />
              <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
              <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50" htmlFor="paypal">
                <img className="object-contain w-14" src={"/images/paypal.jpg"} alt="PayPal" />
                <span className="ml-5">PayPal</span>
              </label>
            </div>
          </form>
          
          <div className="flex justify-between mt-5">
            <p className="text-xl font-medium">Total</p>
            <p className="text-xl font-medium">${total.toFixed(2)}</p>
          </div>
          
          <Button className="mt-5" onClick={onSubmit}>Place Order</Button>
        </div>
      </div>
    </main>
  );
};

export default Payment;
