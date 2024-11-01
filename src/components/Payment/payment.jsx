"use client";
import React, { useState } from "react";

const Checkout = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); 
    if (onSubmit) {
      console.log("payment")
      
      onSubmit();
      
      const expiryParts = expiry.split("-");
      const month = expiryParts[1];
      const year = expiryParts[0].slice(-2);
      setName("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setLoading(false)
    }
    



    // Call the parent onSubmit function if it exists
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-12 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="mb-5 text-2xl font-bold text-center text-gray-800">Payment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="mb-5 text-lg font-bold text-gray-800">Pay with:</h2>

        {paymentMethod === "card" && (
          <>
            <img src="/visa.jpg" alt="Visa" className="h-10 mb-5 w-72" />
            <div className="mb-5">
              <label className="block mb-1 font-bold text-gray-800">Card Number:</label>
              <input
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-1 font-bold text-gray-800">Expiration Date:</label>
              <input
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                type="month"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-1 font-bold text-gray-800">CVV</label>
              <input
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button   disabled={loading} onClick={handleSubmit} type="submit" className="w-full py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700">
        {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
