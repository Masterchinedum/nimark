import { auth } from '@/auth';
import prisma from '@/lib/prisma';

/**
 * Get the current session
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user with full database details
 */
export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.user?.email) {
    return null;
  }

  // Fetch full user details from database
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      emailVerified: true,
      isActive: true,
      isSuspended: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

/**
 * Require authentication - returns user or null if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  return user;
}

/**
 * Check if user has permission
 */
export async function hasPermission() {
  const user = await getCurrentUser();
  
  if (!user) return false;
  
  // Add your permission logic here
  // For now, all authenticated users have permissions
  return true;
}
