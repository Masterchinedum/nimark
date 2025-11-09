import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * Get the current user ID from the session
 * Returns the user ID or null if not authenticated
 */
export async function getCurrentUserId() {
  const session = await auth()
  return session?.user?.id || null
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
