"use client";

import { Category } from "@/types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface CategoryPillsProps {
  categories: Category[];
}

const CategoryPills: React.FC<CategoryPillsProps> = ({ categories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftShadow(scrollLeft > 10);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    handleScroll(); // Initial check
    container.addEventListener("scroll", handleScroll);
    
    return () => container.removeEventListener("scroll", handleScroll);
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Shop by Category</h2>
        <Link 
          href="/categories" 
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative -mx-4 sm:mx-0">
        {/* Left shadow gradient */}
        {showLeftShadow && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Right shadow gradient */}
        {showRightShadow && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-2 sm:gap-3 px-4 sm:px-0 py-1">
            {/* All Categories pill */}
            <Link href="/categories">
              <div className="shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-primary bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-90 transition-all active:scale-95 whitespace-nowrap shadow-sm">
                All Categories
              </div>
            </Link>

            {/* Category pills */}
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border bg-card hover:bg-accent hover:border-primary transition-all active:scale-95 whitespace-nowrap shadow-sm">
                  <span className="font-medium text-sm sm:text-base">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;
