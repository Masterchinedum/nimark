import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { sessionCache, rateLimiter } from '@/lib/redis';

// Extend the built-in session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string;
      isActive: boolean;
      isSuspended: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    isActive: boolean;
    isSuspended: boolean;
    suspendedReason?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/welcome',
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Rate limiting - 5 attempts per 15 minutes
        const isAllowed = await rateLimiter.check(`login:${email}`, 5, 900);
        if (!isAllowed) {
          throw new Error('Too many login attempts. Please try again later.');
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // Check if account is suspended
        if (user.isSuspended) {
          throw new Error(
            `Account suspended${user.suspendedReason ? `: ${user.suspendedReason}` : ''}`
          );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        // Reset rate limit on successful login
        await rateLimiter.reset(`login:${email}`);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isActive: user.isActive,
          isSuspended: user.isSuspended,
          suspendedReason: user.suspendedReason,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers
      if (account?.provider !== 'credentials') {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Check if suspended
          if (existingUser.isSuspended) {
            return false;
          }

          // Update last login
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { lastLoginAt: new Date() },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.isActive = user.isActive;
        token.isSuspended = user.isSuspended;
      }

      // Update session
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      // Verify user still exists and is active on each request
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            isActive: true,
            isSuspended: true,
          },
        });

        if (!dbUser || dbUser.isSuspended) {
          return {};
        }

        token.isActive = dbUser.isActive;
        token.isSuspended = dbUser.isSuspended;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isActive = token.isActive as boolean;
        session.user.isSuspended = token.isSuspended as boolean;
      }

      // Cache session in Redis for faster lookups
      if (session.user?.id) {
        await sessionCache.set(
          session.user.id,
          {
            userId: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
          30 * 24 * 60 * 60 // 30 days
        );
      }

      return session;
    },
  },

  events: {
    async signOut(message) {
      // Clear Redis cache on signout
      const token = 'token' in message ? message.token : null;
      if (token?.id) {
        await sessionCache.delete(token.id as string);
        await sessionCache.deleteUserSessions(token.id as string);
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',
});
