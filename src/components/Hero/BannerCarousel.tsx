import Image from "next/image";
import React from "react";

const BannerCarousel = () => {
  return (
    <div className="relative m-5 overflow-hidden w- carousel">
      {/* Carousel Item */}
      <div id="item1" className="relative w-full carousel-item">
        <img
          alt="Banner"
          src="https://img.freepik.com/free-photo/excited-redhead-girl-showing-mobile-phone-screen-credit-card-demonstrating-online-store-appli_1258-156014.jpg?t=st=1726765734~exp=1726769334~hmac=9f34aedbb9de3b08cd380209b29f08d66265f204846b2561f1ded266fed5884f&w=2000"
          className="object-cover w-full h-full"
        />

        {/* Gradient Overlay */}
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
      </div>
    </div>
  );
};

export default BannerCarousel;
