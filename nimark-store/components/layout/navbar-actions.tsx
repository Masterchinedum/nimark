'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useMounted } from '@/hooks/use-mounted';

const NavbarActions = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push('/cart')}
        variant="outline"
        size="icon"
        className="relative"
      >
        <ShoppingBag className="h-5 w-5" />
        {cart.items.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {cart.items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
