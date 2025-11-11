import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail, generateToken } from '@/lib/email';
import { rateLimiter } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Rate limiting: 3 attempts per hour
    const allowed = await rateLimiter.check(`forgot-password:${email}`, 3, 3600);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not (security)
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists, you will receive a password reset email',
      });
    }

    // Delete any existing password reset tokens
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'password_reset',
      },
    });

    // Generate new token
    const token = generateToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
        type: 'password_reset',
      },
    });

    // Send email
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({
      message: 'If an account exists, you will receive a password reset email',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
