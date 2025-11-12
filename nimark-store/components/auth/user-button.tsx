'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings, Package, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  variant?: 'light' | 'default';
}

export default function UserButton({ user, variant = 'default' }: UserButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: User, label: 'Profile', href: '/account' },
    { icon: Package, label: 'Orders', href: '/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/addresses' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || 'U';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative rounded-full ${
            variant === 'light' ? 'hover:bg-primary-foreground/10' : ''
          }`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>My Account</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || undefined} alt={user.name || ''} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
