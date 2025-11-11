import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOTPEmail, generateOTP } from '@/lib/email';
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

    // Rate limiting: 3 attempts per 15 minutes
    const allowed = await rateLimiter.check(`send-otp:${email}`, 3, 900);
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

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete any existing OTP tokens
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'otp',
      },
    });

    // Generate OTP
    const otp = generateOTP(6);
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires,
        type: 'otp',
      },
    });

    // Send email
    await sendOTPEmail(email, otp);

    return NextResponse.json({
      message: 'OTP sent to your email',
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
