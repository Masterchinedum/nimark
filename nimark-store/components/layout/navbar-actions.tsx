'use client';

import { ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useMounted } from '@/hooks/use-mounted';
import UserButton from '@/components/auth/user-button';

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

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {user ? (
        <UserButton user={user} />
      ) : (
        <Button
          onClick={() => router.push('/auth/signin')}
          variant="ghost"
          size="icon"
        >
          <User className="h-5 w-5" />
        </Button>
      )}
      
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
