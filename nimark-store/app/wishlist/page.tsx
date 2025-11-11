import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Heart, ShoppingCart } from 'lucide-react';

export default async function WishlistPage() {
  const user = await requireAuth();

  if (!user || !user.id) {
    redirect('/auth/signin');
  }

  const wishlistItems = await prisma.wishlistItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: {
        include: {
          category: true,
          brand: true,
        },
      },
    },
    orderBy: {
      addedAt: 'desc',
    },
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
            <p className="mt-2 text-muted-foreground">
              Items you've saved for later
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">Your wishlist is empty</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Save items you love to your wishlist for later
                </p>
                <Button asChild className="mt-6">
                  <Link href="/">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Link href={`/product/${item.product.id}`}>
                      {item.product.images && item.product.images.length > 0 && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </Link>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold hover:underline">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.product.brand && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.product.brand.name}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      {item.product.isArchived ? (
                        <Button size="sm" disabled>
                          Out of Stock
                        </Button>
                      ) : (
                        <Button size="sm" asChild>
                          <Link href={`/product/${item.product.id}`}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
