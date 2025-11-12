"use client";

import Link from "next/link";
import { Zap, TrendingUp, Gift, Percent } from "lucide-react";

const quickActions = [
  {
    title: "Flash Deals",
    icon: Zap,
    href: "/deals",
    gradient: "from-orange-500 to-red-500",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    title: "New Arrivals",
    icon: TrendingUp,
    href: "/new",
    gradient: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Best Sellers",
    icon: Gift,
    href: "/best-sellers",
    gradient: "from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    title: "Clearance",
    icon: Percent,
    href: "/clearance",
    gradient: "from-green-500 to-emerald-500",
    textColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
];

const QuickActionCards = () => {
  return (
    <div className="relative -mx-4 sm:mx-0">
      {/* Gradient fade on edges for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none sm:hidden" />
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 px-4 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="shrink-0 w-[140px] sm:w-auto group"
              >
                <div className={`${action.bgColor} rounded-xl p-4 sm:p-5 transition-all hover:shadow-lg hover:scale-105 active:scale-95 h-full`}>
                  <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                    {/* Icon with gradient background */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                    </div>
                    
                    {/* Title */}
                    <div>
                      <h3 className={`font-bold text-sm sm:text-base ${action.textColor} dark:text-white`}>
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;
