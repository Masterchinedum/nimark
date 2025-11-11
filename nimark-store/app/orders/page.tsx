import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { Package } from 'lucide-react';

export default async function OrdersPage() {
  const user = await requireAuth();

  if (!user || !user.id) {
    redirect('/auth/signin');
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
            <p className="mt-2 text-muted-foreground">
              View and track your order history
            </p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  When you make a purchase, your orders will appear here
                </p>
                <Button asChild className="mt-6">
                  <Link href="/">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>
                        <CardDescription>
                          Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 border-b pb-4 last:border-0"
                        >
                          <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                            {item.product.images && item.product.images.length > 0 && (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between border-t pt-4">
                        <p className="font-semibold">Total</p>
                        <p className="text-lg font-bold">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>

                      {order.isPaid && (
                        <Badge variant="outline" className="mt-2">
                          Paid on {format(new Date(order.createdAt), 'MMM d, yyyy')}
                        </Badge>
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
