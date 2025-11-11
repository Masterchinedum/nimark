import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Get current session
export async function getSession() {
  return await auth();
}

// Get current user
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// Require authentication (for server components/actions)
export async function requireAuth() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect('/auth/signin');
  }
  
  if (session.user.isSuspended) {
    redirect('/auth/suspended');
  }
  
  return session.user;
}

// Check if user has permission
export async function hasPermission(permission: string) {
  const user = await getCurrentUser();
  
  if (!user) return false;
  
  // Add your permission logic here
  // For now, all authenticated users have permissions
  return true;
}
