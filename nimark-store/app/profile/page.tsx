import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Container from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default async function ProfilePage() {
  const user = await requireAuth();

  if (!user) {
    redirect('/auth/signin');
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your personal information
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback className="text-3xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold">{user.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                {user.emailVerified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified Account
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your account details and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Email Address</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      {user.emailVerified ? (
                        <Badge variant="outline" className="mt-1">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="mt-1">
                          Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  {user.createdAt && (
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 border-t pt-6">
                  <Button asChild variant="outline">
                    <Link href="/account/settings">Edit Profile</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/account/settings">Change Password</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
