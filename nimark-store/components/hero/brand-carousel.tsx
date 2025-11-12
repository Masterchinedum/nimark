"use client";

import { Brand } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface BrandCarouselProps {
  brands: Brand[];
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ brands }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (brands.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Shop by Brand</h2>
        <Link 
          href="/brands" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="relative -mx-4 sm:mx-0">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background to-transparent z-10 pointer-events-none sm:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none sm:hidden" />

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-3 sm:gap-4 px-4 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link 
                key={brand.id} 
                href={`/brand/${brand.id}`}
                className="shrink-0 w-[120px] sm:w-auto group"
              >
                <div className="bg-card border border-border rounded-lg p-4 sm:p-5 hover:border-primary hover:shadow-md transition-all active:scale-95 h-full">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    {/* Brand logo */}
                    {brand.imageUrl ? (
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                        <Image
                          src={brand.imageUrl}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Brand name */}
                    <p className="text-xs sm:text-sm font-medium text-center line-clamp-2 group-hover:text-primary transition-colors">
                      {brand.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
