'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCart from '@/hooks/use-cart';
import { useMounted } from '@/hooks/use-mounted';
import UserButton from '@/components/auth/user-button';
import { Category } from '@/types';

interface MobileNavbarProps {
  categories: Category[];
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ categories, user }) => {
  const router = useRouter();
  const isMounted = useMounted();
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalItems = isMounted ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-primary shadow-md">
        {/* Layer 1: Logo, Account, Cart, Hamburger */}
        <div className="flex h-14 items-center justify-between px-3 gap-2">
          {/* Hamburger Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="shrink-0 h-10 w-10 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground text-primary font-bold text-base shadow-sm">
              N
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold tracking-tight text-primary-foreground leading-none">
                NIMARK
              </p>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User Account */}
          {user ? (
            <div className="shrink-0">
              <UserButton user={user} variant="light" />
            </div>
          ) : (
            <Button
              onClick={() => router.push('/auth/signin')}
              variant="ghost"
              className="shrink-0 flex flex-col items-center justify-center h-10 px-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <User className="h-5 w-5" />
              <span className="text-[9px] font-medium leading-tight">Sign in</span>
            </Button>
          )}

          {/* Shopping Cart */}
          <Button
            onClick={() => router.push('/cart')}
            variant="ghost"
            className="shrink-0 relative h-10 px-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-primary">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </div>
          </Button>
        </div>

        {/* Layer 2: Search Bar */}
        <div className="px-3 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full pr-12 bg-white border-0 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-purple-500"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 h-10 w-10 bg-purple-600 hover:bg-purple-700 text-white rounded-l-none"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>

        {/* Layer 3: Categories List */}
        <div className="bg-primary-foreground/10 backdrop-blur-sm border-t border-primary-foreground/20 overflow-x-auto scrollbar-hide">
          <div className="flex h-10 items-center gap-4 px-3">
            <Link 
              href="/" 
              className="shrink-0 text-xs font-semibold text-primary-foreground hover:text-primary-foreground/80 transition-colors whitespace-nowrap"
            >
              All
            </Link>
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="shrink-0 text-xs font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
            {categories.length > 8 && (
              <Link 
                href="/categories" 
                className="shrink-0 text-xs font-semibold text-primary-foreground hover:text-primary-foreground/80 whitespace-nowrap"
              >
                More →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Menu Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-background z-50 shadow-2xl overflow-y-auto">
            {/* Sidebar Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-foreground">
                <User className="h-6 w-6" />
                <span className="font-semibold">
                  {user ? `Hello, ${user.name?.split(' ')[0] || 'User'}` : 'Hello, Sign in'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="p-4">
              <div className="space-y-4">
                {/* Categories Section */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2">Shop by Category</h3>
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={() => setIsSidebarOpen(false)}
                      className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      All Products
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* User Actions */}
                {user && (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-bold text-foreground mb-2">Your Account</h3>
                    <div className="space-y-1">
                      <Link
                        href="/account"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Your Account
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Your Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Your Wishlist
                      </Link>
                    </div>
                  </div>
                )}

                {/* Sign In Button for non-logged users */}
                {!user && (
                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => {
                        setIsSidebarOpen(false);
                        router.push('/auth/signin');
                      }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavbar;
