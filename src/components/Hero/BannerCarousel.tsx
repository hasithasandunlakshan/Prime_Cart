"use client"
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image"; // Import the Image component

// Import your images
import img1 from "./carousel_Images/C_image_01.webp";
import img2 from "./carousel_Images/C_image_02.webp";
import img3 from "./carousel_Images/C_image_03.webp";
import img4 from "./carousel_Images/C_image_04.webp";

const BannerCarousel = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  // Update the slides array to use local images
  const slides = [
    {
      id: 1,
      image: img1, // Use imported images
      title: "Super Sale!",
      description: "Get the best deals on all your favorite products.",
    },
    {
      id: 2,
      image: img2, // Use imported images
      title: "Limited Offer!",
      description: "Grab your exclusive discounts now!",
    },
    {
      id: 3,
      image: img3, // Use imported images
      title: "Best Sellers!",
      description: "Discover our best-selling products.",
    },
    {
      id: 4,
      image: img4, // Use imported images
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
                <Image
                  alt="Banner"
                  src={slide.image} // Use imported images
                  layout="fill" // Make it responsive
                  objectFit="cover" // Cover the entire area
                  className="rounded-lg" // Optional: add some styling
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
