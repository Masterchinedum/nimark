import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
  const session = await auth()
  const isLoggedIn = !!session
  const isAuthPage = req.nextUrl.pathname.startsWith('/sign-in') || 
                     req.nextUrl.pathname.startsWith('/sign-up')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')

  // Allow API routes and webhooks to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect non-logged-in users to sign-in (except for auth pages)
  if (!isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}