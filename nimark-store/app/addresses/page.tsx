import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { MapPin, Plus } from 'lucide-react';

export default async function AddressesPage() {
  const user = await requireAuth();

  if (!user || !user.id) {
    redirect('/auth/signin');
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      isDefault: 'desc',
    },
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Addresses</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your shipping addresses
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MapPin className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No addresses saved</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Add a shipping address for faster checkout
                </p>
                <Button className="mt-6">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Address
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                      {address.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    {address.phone && (
                      <CardDescription>{address.phone}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm" className="flex-1">
                          Set Default
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
