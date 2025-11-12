'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('q', searchQuery.trim());
      if (selectedCategory !== 'All') {
        params.set('category', selectedCategory);
      }
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-stretch">
      {/* Category Dropdown - Always visible, changes appearance on mobile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            type="button"
            variant="outline" 
            className="h-10 rounded-r-none border-r-0 bg-muted/50 hover:bg-muted shrink-0"
          >
            {/* Mobile: Hamburger menu icon */}
            <Menu className="h-4 w-4 md:hidden" />
            {/* Desktop: Category text with dropdown */}
            <span className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium">
              <span className="truncate max-w-[60px] lg:max-w-20">{selectedCategory}</span>
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 shrink-0 opacity-50" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] md:w-[220px]">
          <DropdownMenuItem onClick={() => setSelectedCategory('All')}>
            <span className="font-medium">All Categories</span>
          </DropdownMenuItem>
          <div className="h-px bg-border my-1" />
          {data.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={selectedCategory === category.name ? 'bg-accent' : ''}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Input - Full width, responsive padding */}
      <div className="relative flex-1 min-w-0">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full pr-10 md:pr-12 rounded-l-none border-input focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 text-sm md:text-base placeholder:text-xs md:placeholder:text-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-0 top-0 h-10 w-10 md:w-12 rounded-l-none bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          <Search className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default MainNav;
