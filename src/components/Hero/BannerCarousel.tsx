import Image from "next/image";
import React from "react";

const BannerCarousel = () => {
  return (
    <div className="flex items-center justify-center mt-40">
    <div className="relative overflow-hidden rounded-lg shadow-lg w-[98%]  carousel">
    <div id="slide1" className="relative w-full carousel-item">
    <img
          alt="Banner"
          src="https://img.freepik.com/free-photo/excited-redhead-girl-showing-mobile-phone-screen-credit-card-demonstrating-online-store-appli_1258-156014.jpg?t=st=1726765734~exp=1726769334~hmac=9f34aedbb9de3b08cd380209b29f08d66265f204846b2561f1ded266fed5884f&w=2000"
          className="object-cover w-full h-full"
        />

<div className="absolute inset-0 flex items-center p-20 bg-gradient-to-r from-black/70 via-black/20 to-transparent">
          <div className="space-y-4 text-left text-white">
            <h1 className="text-3xl font-bold md:text-5xl">Super Sale!</h1>
            <p className="text-lg md:text-xl">
              Get the best deals on all your favorite products.
            </p>
            <button className="px-6 py-3 font-semibold text-white transition-all bg-red-500 rounded-md hover:bg-red-600">
              Shop Now
            </button>
          </div>
        </div>
      <div className="absolute inset-0 flex items-center justify-between px-5">
        <a href="#slide4" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❮</a>
        <a href="#slide2" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❯</a>
      </div>
    </div>
    <div id="slide2" className="relative w-full carousel-item">
    <img
          alt="Banner"
          src="https://img.freepik.com/free-photo/excited-redhead-girl-showing-mobile-phone-screen-credit-card-demonstrating-online-store-appli_1258-156014.jpg?t=st=1726765734~exp=1726769334~hmac=9f34aedbb9de3b08cd380209b29f08d66265f204846b2561f1ded266fed5884f&w=2000"
          className="object-cover w-full h-full"
        />
      <div className="absolute inset-0 flex items-center justify-between px-5">
        <a href="#slide1" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❮</a>
        <a href="#slide3" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❯</a>
      </div>
    </div>
    <div id="slide3" className="relative w-full carousel-item">
      <img
        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
        className="object-cover w-full" />
      <div className="absolute inset-0 flex items-center justify-between px-5">
        <a href="#slide2" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❮</a>
        <a href="#slide4" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❯</a>
      </div>
    </div>
    <div id="slide4" className="relative w-full carousel-item">
      <img
        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
        className="object-cover w-full" />
      <div className="absolute inset-0 flex items-center justify-between px-5">
        <a href="#slide3" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❮</a>
        <a href="#slide1" className="text-black transition duration-300 ease-in-out bg-white opacity-75 btn btn-circle hover:opacity-100">❯</a>
      </div>
    </div>
  </div>
  </div>
  );
};

export default BannerCarousel;
