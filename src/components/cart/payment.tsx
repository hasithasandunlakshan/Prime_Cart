import React from 'react';

export default function Payment() {
  return (
    <main className='flex  flex-col justify-center items-center  align-middle w-full]'>
          <div className='shadow-2xl shadow-gray-500 w-[50%] mt-10'>
      <div className="w-full max-w-lg mx-auto my-10">
        <h1 className="relative text-2xl font-medium text-black sm:text-3xl">
          Secure Checkout
          <span className="block w-10 h-1 mt-2 bg-black sm:w-20"></span>
        </h1>
        <form action="" className="flex flex-col mt-10 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.capler@fang.com"
              className="block w-full px-4 py-3 mt-1 text-sm placeholder-gray-400 transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <label htmlFor="card-number" className="text-xs font-semibold text-gray-800">
              Card number
            </label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              placeholder="1234-5678-XXXX-XXXX"
              className="block w-full px-4 py-3 pr-10 text-sm placeholder-gray-400 transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none focus:ring-2 focus:ring-black"
            />
            {/* <img
              src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
              alt="Card logo"
              className="absolute bottom-3 right-3 max-h-4"
            /> */}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Expiration date</p>
            <div className="flex flex-wrap mr-6">
              <div className="my-1">
                <label htmlFor="month" className="sr-only">
                  Select expiration month
                </label>
                <select
                  name="month"
                  id="month"
                  className="px-2 py-3 text-sm transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-black"
                >
                  <option value="">Month</option>
                </select>
              </div>
              <div className="my-1 ml-3 mr-6">
                <label htmlFor="year" className="sr-only">
                  Select expiration year
                </label>
                <select
                  name="year"
                  id="year"
                  className="px-2 py-3 text-sm transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-black"
                >
                  <option value="">Year</option>
                </select>
              </div>
              <div className="relative my-1">
                <label htmlFor="security-code" className="sr-only">
                  Security code
                </label>
                <input
                  type="text"
                  id="security-code"
                  name="security-code"
                  placeholder="Security code"
                  className="block px-4 py-3 text-sm placeholder-gray-400 transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none w-36 focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="card-name" className="sr-only">
              Card name
            </label>
            <input
              type="text"
              id="card-name"
              name="card-name"
              placeholder="Name on the card"
              className="block w-full px-4 py-3 mt-1 text-sm placeholder-gray-400 transition bg-gray-100 border-gray-400 rounded shadow-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </form>
        <p className="mt-10 text-sm font-semibold text-center text-gray-600">
          By placing this order you agree to the{' '}
          <a href="#" className="text-black underline whitespace-nowrap hover:text-gray-700">
            Terms and Conditions
          </a>
        </p>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded bg-black py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-black sm:text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
    </main>
  
  );
}
