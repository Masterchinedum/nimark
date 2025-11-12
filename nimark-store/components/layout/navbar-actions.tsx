'use client';

import { ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useMounted } from '@/hooks/use-mounted';
import UserButton from '@/components/auth/user-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavbarActionsProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ user }) => {
  const isMounted = useMounted();
  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        {/* Wishlist - Hidden on smallest screens, icon on tablet, full button on desktop */}
        {user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/wishlist')}
                variant="ghost"
                size="icon"
                className="hidden sm:flex h-9 w-9 md:h-10 md:w-10 hover:text-primary hover:bg-primary/10"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your Wishlist</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* User Account */}
        {user ? (
          <div className="hidden md:block">
            <UserButton user={user} />
          </div>
        ) : (
          <>
            {/* Desktop - Full button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push('/auth/signin')}
                  variant="ghost"
                  className="hidden md:flex flex-col items-start h-auto py-1.5 px-2 lg:px-3 hover:bg-transparent hover:text-primary"
                >
                  <span className="text-[10px] lg:text-xs text-muted-foreground leading-tight">Hello, sign in</span>
                  <span className="text-xs lg:text-sm font-semibold leading-tight">Account</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign in to your account</p>
              </TooltipContent>
            </Tooltip>

            {/* Mobile - Icon only */}
            <Button
              onClick={() => router.push('/auth/signin')}
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 hover:text-primary hover:bg-primary/10"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">Sign in</span>
            </Button>
          </>
        )}

        {/* Mobile User Icon for logged in users */}
        {user && (
          <div className="md:hidden">
            <UserButton user={user} />
          </div>
        )}

        {/* Orders - Desktop only */}
        {user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/orders')}
                variant="ghost"
                className="hidden lg:flex flex-col items-start h-auto py-1.5 px-3 hover:bg-transparent hover:text-primary"
              >
                <span className="text-xs text-muted-foreground leading-tight">Returns</span>
                <span className="text-sm font-semibold leading-tight">& Orders</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View your orders</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Shopping Cart - Responsive design */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/cart')}
              variant="ghost"
              className="relative gap-1.5 md:gap-2 hover:text-primary hover:bg-primary/10 px-2 md:px-3 h-9 md:h-10"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-primary text-[10px] md:text-xs font-bold text-primary-foreground ring-2 ring-background">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              {/* Desktop text */}
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-xs text-muted-foreground leading-tight">Cart</span>
                <span className="text-sm font-semibold leading-tight">
                  {totalItems}
                </span>
              </div>
              {/* Tablet/Mobile text */}
              <span className="text-xs md:text-sm font-semibold lg:hidden">
                {totalItems}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default NavbarActions;
