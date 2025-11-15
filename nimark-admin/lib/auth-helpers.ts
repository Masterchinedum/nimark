import { auth } from "@/auth"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

/**
 * Get the current user ID from the session
 * Returns the user ID or null if not authenticated
 */
export async function getCurrentUserId() {
  const session = await auth()
  return session?.user?.id || null
}

/**
 * Get the current user's role from the session
 * Returns the user role or null if not authenticated
 */
export async function getCurrentUserRole() {
  const session = await auth()
  return session?.user?.role || null
}

/**
 * Check if user is authenticated and return user ID
 * Returns NextResponse with 401 if not authenticated
 */
export async function requireAuth() {
  const userId = await getCurrentUserId()
  
  if (!userId) {
    return { userId: null, error: new NextResponse("Unauthenticated", { status: 401 }) }
  }
  
  return { userId, error: null }
}

/**
 * Check if user is authenticated and has ADMIN role
 * Returns NextResponse with 401 if not authenticated or 403 if not admin
 */
export async function requireAdmin() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { userId: null, role: null, error: new NextResponse("Unauthenticated", { status: 401 }) }
  }
  
  if (session.user.role !== "ADMIN") {
    return { userId: null, role: null, error: new NextResponse("Forbidden - Admin access required", { status: 403 }) }
  }
  
  return { userId: session.user.id, role: session.user.role, error: null }
}

/**
 * Check if user is authenticated and has ADMIN or VENDOR role
 * Returns NextResponse with 401 if not authenticated
 */
export async function requireVendorOrAdmin() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { userId: null, role: null, error: new NextResponse("Unauthenticated", { status: 401 }) }
  }
  
  return { userId: session.user.id, role: session.user.role, error: null }
}

/**
 * Verify that a user has access to a specific store
 * Admins have access to all stores, vendors only to their own
 * Returns NextResponse with 403 if unauthorized
 */
export async function assertStoreAccess(userId: string, storeId: string, userRole?: string) {
  // If role is ADMIN, grant access to all stores
  if (userRole === "ADMIN") {
    return { hasAccess: true, error: null }
  }
  
  // For vendors, check if they own the store
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: userId
    }
  })

  if (!store) {
    return { hasAccess: false, error: new NextResponse("Unauthorized - Store access denied", { status: 403 }) }
  }

  return { hasAccess: true, error: null }
}
