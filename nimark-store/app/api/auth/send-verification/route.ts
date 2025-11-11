import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendVerificationEmail, generateToken } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      );
    }

    // Delete any existing tokens
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'email',
      },
    });

    // Generate new token
    const token = generateToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save token to database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
        type: 'email',
      },
    });

    // Send email
    await sendVerificationEmail(email, token);

    return NextResponse.json({
      message: 'Verification email sent',
    });
  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}
