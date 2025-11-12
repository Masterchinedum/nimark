"use client";

import { Billboard } from "@/types";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  billboards: Billboard[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ billboards }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const validBillboards = billboards.length > 0 ? billboards : [];
  const hasMultipleSlides = validBillboards.length > 1;

  const nextSlide = useCallback(() => {
    if (!hasMultipleSlides) return;
    setCurrentSlide((prev) => (prev + 1) % validBillboards.length);
  }, [hasMultipleSlides, validBillboards.length]);

  const prevSlide = useCallback(() => {
    if (!hasMultipleSlides) return;
    setCurrentSlide((prev) => (prev - 1 + validBillboards.length) % validBillboards.length);
  }, [hasMultipleSlides, validBillboards.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !hasMultipleSlides) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, hasMultipleSlides]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (validBillboards.length === 0) {
    return (
      <div className="relative w-full aspect-video sm:aspect-21/9 lg:aspect-24/9 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No promotional banners available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full aspect-video sm:aspect-21/9 lg:aspect-24/9 rounded-lg overflow-hidden group shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {validBillboards.map((billboard, index) => (
          <div
            key={billboard.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={billboard.imageUrl}
              alt={billboard.label}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            />
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Billboard label */}
            {billboard.label && (
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <h2 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold drop-shadow-lg max-w-2xl">
                  {billboard.label}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      {hasMultipleSlides && (
        <>
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="hidden sm:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" />
          </button>
          
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="hidden sm:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Dots Navigation - Mobile friendly, larger touch targets */}
      {hasMultipleSlides && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {validBillboards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-white"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {hasMultipleSlides && isAutoPlaying && (
        <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-medium">Auto</span>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
