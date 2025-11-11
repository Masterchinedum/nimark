import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import type { NextAuthRequest } from 'next-auth';

// Define protected routes that require authentication
const protectedRoutes = [
  '/account',
  '/orders',
  '/wishlist',
  '/addresses',
  '/profile',
];

// Define auth routes (redirect to home if already authenticated)
const authRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
];

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect to signin if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Redirect to home if accessing auth routes while logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  // Check if user is suspended
  if (isLoggedIn && req.auth?.user?.isSuspended) {
    if (nextUrl.pathname !== '/auth/suspended') {
      return NextResponse.redirect(new URL('/auth/suspended', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
