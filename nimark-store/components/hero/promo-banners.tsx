"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PromoBanner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  discount?: string;
  endTime?: Date;
  bgColor: string;
}

// Example promo data - in real app, this could come from API
const promoData: PromoBanner[] = [
  {
    id: "1",
    title: "Mega Laptop Sale",
    description: "Premium laptops at unbeatable prices",
    imageUrl: "/placeholder-laptop.jpg",
    href: "/category/laptops",
    discount: "Up to 40% OFF",
    bgColor: "bg-blue-600",
  },
  {
    id: "2", 
    title: "Mobile Madness",
    description: "Latest smartphones with exclusive deals",
    imageUrl: "/placeholder-phone.jpg",
    href: "/category/mobile-phones",
    discount: "Save Big",
    bgColor: "bg-purple-600",
  },
];

const PromoBanners = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Countdown timer for flash sales
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const difference = endOfDay.getTime() - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6">
      {promoData.map((promo, index) => (
        <Link 
          key={promo.id} 
          href={promo.href}
          className="block group"
        >
          <div className={`relative h-[180px] sm:h-[220px] lg:h-[260px] rounded-xl overflow-hidden ${promo.bgColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}>
            {/* Background pattern/texture */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-5 sm:p-6 lg:p-7">
              <div className="space-y-2">
                {/* Badge */}
                {promo.discount && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 font-bold text-xs sm:text-sm shadow-md">
                    <span>⚡</span>
                    <span>{promo.discount}</span>
                  </div>
                )}

                {/* Title and description */}
                <div>
                  <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-1 drop-shadow-lg">
                    {promo.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base drop-shadow">
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-end justify-between">
                <div>
                  {/* Timer - only show on first banner */}
                  {index === 0 && timeLeft && (
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-mono font-bold text-base sm:text-lg">
                        {timeLeft}
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm sm:text-base shadow-lg group-hover:bg-yellow-400 group-hover:scale-105 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative image placeholder - you can replace with actual product images */}
                <div className="hidden sm:flex w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center">
                  <div className="text-white/80 text-3xl lg:text-4xl">
                    {index === 0 ? "💻" : "📱"}
                  </div>
                </div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PromoBanners;
