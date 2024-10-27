"use client"
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const BannerCarousel = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000,  stopOnInteraction: false }));

  const slides = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/excited-redhead-girl-showing-mobile-phone-screen-credit-card-demonstrating-online-store-appli_1258-156014.jpg?t=st=1726765734~exp=1726769334~hmac=9f34aedbb9de3b08cd380209b29f08d66265f204846b2561f1ded266fed5884f&w=2000",
      title: "Super Sale!",
      description: "Get the best deals on all your favorite products.",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/excited-redhead-girl-showing-mobile-phone-screen-credit-card-demonstrating-online-store-appli_1258-156014.jpg?t=st=1726765734~exp=1726769334~hmac=9f34aedbb9de3b08cd380209b29f08d66265f204846b2561f1ded266fed5884f&w=2000",
      title: "Limited Offer!",
      description: "Grab your exclusive discounts now!",
    },
    {
      id: 3,
      image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Best Sellers!",
      description: "Discover our best-selling products.",
    },
    {
      id: 4,
      image: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
      title: "New Arrivals!",
      description: "Check out the latest additions to our collection.",
    },
  ];

  return (
    <div className="flex items-center justify-center py-44">
      <Carousel
        plugins={[plugin.current]}
        className="relative overflow-hidden rounded-lg shadow-lg w-[98%]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full carousel-item">
                <img
                  alt="Banner"
                  src={slide.image}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-end p-20 justify-left bg-gradient-to-r from-black/70 via-black/20 to-transparent">
                  <div className="space-y-4 text-left text-white">
                    <h1 className="text-3xl font-bold md:text-5xl">{slide.title}</h1>
                    <p className="text-lg md:text-xl">{slide.description}</p>
                    <button className="px-6 py-3 font-semibold text-white transition-all bg-red-500 rounded-md hover:bg-red-600">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    
    </div>
  );
};

export default BannerCarousel;