import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, MapPin, ShoppingBag, Heart, Settings } from 'lucide-react';

export default async function AccountPage() {
  const user = await requireAuth();

  if (!user) {
    redirect('/auth/signin');
  }

  const menuItems = [
    {
      title: 'Profile',
      description: 'Manage your personal information',
      href: '/profile',
      icon: User,
    },
    {
      title: 'Orders',
      description: 'View and track your orders',
      href: '/orders',
      icon: ShoppingBag,
    },
    {
      title: 'Wishlist',
      description: 'View your saved items',
      href: '/wishlist',
      icon: Heart,
    },
    {
      title: 'Addresses',
      description: 'Manage your shipping addresses',
      href: '/addresses',
      icon: MapPin,
    },
    {
      title: 'Settings',
      description: 'Account settings and preferences',
      href: '/account/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.name || user.email}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
