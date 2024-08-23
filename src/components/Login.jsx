import React from 'react'
import Image from 'next/image'
function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">

    <h1  className="mb-4 text-5xl font-bold text-black">Prime Cart</h1>
    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
      <div className="w-1/2 p-8">
        <h2 className="mb-6 text-3xl font-bold">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email or Username
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded"
              placeholder="Enter your email or username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-yellow-500 hover:underline">
              Forgot your password? Reset now
            </a>
            <button className="px-4 py-2 text-white bg-yellow-500 rounded">
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center">
            New to PrimeCart?{' '}
            <a href="#" className="text-yellow-500 hover:underline">
              Create new account
            </a>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-yellow-400">
        <div className="items-center text-center align-middle rounded-lg">
          <Image
            src="/login.jpg"
            alt="E-Commerce"
            width={400}
            height={400}
            
            className="mb-4"
          />
          <h2 className="text-2xl font-bold">E-COMMERCE AND SHOPPING</h2>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
