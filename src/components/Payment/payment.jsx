"use client";
import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState(''); 
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Extract year and month from the expiry date
    const expiryDate = new Date(expiry);
    const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = expiryDate.getFullYear().toString().slice(-2); // Extract last 2 digits of the year

    setMessage(`Payment of Rs${1000} successfully completed. Expiry: ${month}/${year}`);
    setName('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setAmount(''); 
  };


  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch names');
        }
        const data = await response.json();
        setNames(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNames();
  }, []);

  return (


    <div className='flex justify-center align-middle bg-white w-[90%]'>
    
    <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>
</div> */}
    
    </div>
    // <div className="max-w-md p-6 mx-auto mt-12 bg-white border border-gray-200 rounded-lg shadow-lg">
    //   <h1 className="mb-5 text-2xl font-bold text-center text-gray-800">Payment</h1>
      
    //   <form onSubmit={handleSubmit} className="flex flex-col">
    //     <h2 className="mb-5 text-lg font-bold text-gray-800">Pay with:</h2>
    //     <div className="flex justify-between mb-5">
    //       <label className="flex items-center">
    //         <input
    //           type="radio"
    //           value="card"
    //           checked={paymentMethod === 'card'}
    //           onChange={() => setPaymentMethod('card')}
    //           className="mr-2 bg-white"
    //         />
    //         Card
    //       </label>
    //       <label className="flex items-center">
    //         <input
    //           type="radio"
    //           value="bankTransfer"
    //           checked={paymentMethod === 'bankTransfer'}
    //           onChange={() => setPaymentMethod('bankTransfer')}
    //           className="mr-2"
    //         />
    //         Bank Transfer
    //       </label>
    //       <label className="flex items-center">
    //         <input
    //           type="radio"
    //           value="cryptocurrency"
    //           checked={paymentMethod === 'cryptocurrency'}
    //           onChange={() => setPaymentMethod('cryptocurrency')}
    //           className="mr-2"
    //         />
    //         Cryptocurrency
    //       </label>
    //     </div>

    //     <img src="/visa.jpg" alt="Visa" className="h-10 mb-5 w-72" />

    //     <div className="mb-5">
    //       <label className="block mb-1 font-bold text-gray-800">Card Number:</label>
    //       <input
    //         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
    //         type="text"
    //         value={cardNumber}
    //         onChange={(e) => setCardNumber(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className="mb-5">
    //       <label className="block mb-1 font-bold text-gray-800 ">Expiration Date:</label>
    //       <input
    //         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
    //         type="month"
    //         value={expiry}
    //         onChange={(e) => setExpiry(e.target.value)}
    //         placeholder="MM/YY"
    //         required
    //       />
    //     </div>

    //     <div className="mb-5">
    //       <label className="block mb-1 font-bold text-gray-800 bg-white">CVV</label>
    //       <input
    //         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
    //         type="text"
    //         value={cvc}
    //         onChange={(e) => setCvc(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <button className="w-full py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700" type="submit">
    //       Pay Rs. 1000
    //     </button>
    //   </form>

    //   {message && <div className="mt-5 font-bold text-center text-green-600">{message}</div>}
    // </div>
  );
};

export default Checkout;
