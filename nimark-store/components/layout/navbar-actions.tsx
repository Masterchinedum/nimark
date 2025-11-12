'use client';

import { ShoppingBag, User } from 'lucide-react';
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
        {/* User Account - Always visible */}
        {user ? (
          <UserButton user={user} />
        ) : (
          <>
            {/* Desktop - Full button with text */}
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

            {/* Mobile/Tablet - Icon with text */}
            <Button
              onClick={() => router.push('/auth/signin')}
              variant="ghost"
              className="flex md:hidden flex-col items-center justify-center h-9 px-2 hover:text-primary hover:bg-primary/10"
            >
              <User className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-tight mt-0.5">Sign in</span>
            </Button>
          </>
        )}

        {/* Orders - Desktop only, for logged in users */}
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

        {/* Shopping Cart - Always visible, responsive design */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/cart')}
              variant="ghost"
              className="relative flex items-center gap-1 md:gap-1.5 hover:text-primary hover:bg-primary/10 px-2 md:px-3 h-9 md:h-10"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 md:-right-2 md:-top-2 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-primary text-[9px] md:text-[10px] font-bold text-primary-foreground ring-1 md:ring-2 ring-background">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              {/* Desktop - Two line text */}
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-xs text-muted-foreground leading-tight">Cart</span>
                <span className="text-sm font-semibold leading-tight">
                  {totalItems}
                </span>
              </div>
              {/* Mobile/Tablet - Single line text */}
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
